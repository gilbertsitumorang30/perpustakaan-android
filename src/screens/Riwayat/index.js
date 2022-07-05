import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BelumLogin, BukuDraft, Navbar} from '../../components';
import {colors} from '../../res/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import {baseUrl} from '../../helpers';
import jwtDecode from 'jwt-decode';
import {ms} from 'react-native-size-matters';
moment.locale('id');

const Riwayat = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const [riwayat, setRiwayat] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getRiwayat = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value) {
        const res = await axios.get(
          `${baseUrl}/anggota/riwayat/buku/${jwtDecode(value).id}`,
        );
        console.log('riwayat:', res.data.data);
        setRiwayat(res.data.data);
      }
    } catch (error) {
      console.log('errornya:', error);
    }
  };
  const onRefresh = () => {
    try {
      setRefreshing(true);
      getRiwayat();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getRiwayat();
  }, [token]);

  return (
    <View style={styles.riwayat}>
      <Navbar title="Riwayat" barClick={() => navigation.openDrawer()} />
      {token ? (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {riwayat.length ? (
            riwayat.map(currentValue => {
              return (
                <BukuDraft
                  key={currentValue.id}
                  judul={currentValue.judul}
                  kategori={currentValue.kategori}
                  gambar={currentValue.foto}
                  kembali={moment(currentValue.tanggal_kembali).format(
                    'dddd, DD MMMM YYYY',
                  )}
                  terlambat={currentValue.terlambat}
                  pinjam={moment(currentValue.tanggal_pinjam).format(
                    'dddd, DD MMMM YYYY',
                  )}
                  batas={moment(currentValue.tanggal_harus_kembali).format(
                    'dddd, DD MMMM YYYY',
                  )}
                  status={currentValue.status}
                  onPress={() =>
                    navigation.navigate('Detail', {id: currentValue.id_buku})
                  }
                />
              );
            })
          ) : (
            <BelumLogin pesan="Belum ada riwayat pengembalian buku terdaftar" />
          )}
        </ScrollView>
      ) : (
        <BelumLogin navigation={navigation} type="login" />
      )}
    </View>
  );
};

export default Riwayat;

const styles = StyleSheet.create({
  riwayat: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  content: {
    padding: ms(12),
    flexGrow: 1,
    backgroundColor: colors.primaryWhite,
  },
});
