import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BelumLogin, BukuDraft, Navbar} from '../../components';
import {colors} from '../../res/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ms} from 'react-native-size-matters';
import axios from 'axios';
import {baseUrl} from '../../helpers';
import jwt_decode from 'jwt-decode';
import {AuthContext} from '../../context/AuthContext';
import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work
moment.locale('id');

const BukuSaya = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const [bukuSaya, setBukuSaya] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getBukuSaya = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value) {
        const res = await axios.get(
          `${baseUrl}/anggota/buku/saya/${jwt_decode(value).id}`,
        );
        setBukuSaya(res.data.data);
      }
    } catch (error) {
      console.log('errornya:', error);
    }
  };
  const onRefresh = () => {
    try {
      setRefreshing(true);
      getBukuSaya();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getBukuSaya();
  }, [token]);

  return (
    <SafeAreaView style={styles.bukuSaya}>
      <Navbar title="Buku Saya" barClick={() => navigation.openDrawer()} />

      {token ? (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {bukuSaya.length ? (
            bukuSaya.map(currentValue => {
              let d = new Date();
              d.setHours(23, 59, 59, 999);
              let dateNow = JSON.parse(JSON.stringify(d));
              let status;
              if (dateNow <= currentValue.tanggal_harus_kembali) {
                status = 'masa peminjaman';
              } else {
                const hari = Math.floor(
                  moment
                    .duration(
                      moment(dateNow).diff(
                        moment(currentValue.tanggal_harus_kembali),
                      ),
                    )
                    .asDays(),
                );
                if (hari <= 0) {
                  status = 'masa peminjaman';
                } else {
                  status = 1000 * hari;
                }
              }
              return (
                <BukuDraft
                  key={currentValue.id_pinjam}
                  judul={currentValue.judul}
                  kategori={currentValue.kategori}
                  gambar={currentValue.foto}
                  batas={moment(currentValue.tanggal_harus_kembali).format(
                    'dddd, DD MMMM YYYY',
                  )}
                  pinjam={moment(currentValue.tanggal_pinjam).format(
                    'dddd, DD MMMM YYYY',
                  )}
                  status={status}
                  onPress={() =>
                    navigation.navigate('Detail', {id: currentValue.id_buku})
                  }
                />
              );
            })
          ) : (
            <BelumLogin pesan="Belum ada buku yang di pinjam, Silahkan pinjam terlebih dahulu" />
          )}
        </ScrollView>
      ) : (
        <BelumLogin navigation={navigation} type="login" />
      )}
    </SafeAreaView>
  );
};

export default BukuSaya;

const styles = StyleSheet.create({
  bukuSaya: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  content: {
    padding: ms(12),
    flexGrow: 1,
    backgroundColor: colors.primaryWhite,
  },
});
