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
import {baseUrl} from '../../helpers';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AuthContext} from '../../context/AuthContext';
import {ms} from 'react-native-size-matters';
import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work
moment.locale('id');

const Permintaan = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const [permintaanSaya, setPermintaanSaya] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getPermintaanSaya = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value) {
        const res = await axios.get(
          `${baseUrl}/anggota/pinjam/buku/${jwtDecode(value).id}`,
        );
        console.log('data:', res.data.data);
        setPermintaanSaya(res.data.data);
      }
    } catch (error) {
      console.log('errornya:', error);
    }
  };

  const onRefresh = () => {
    try {
      setRefreshing(true);
      getPermintaanSaya();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPermintaanSaya();
  }, [token]);

  return (
    <SafeAreaView style={styles.permintaan}>
      <Navbar title="Permintaan" barClick={() => navigation.openDrawer()} />
      {token ? (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {permintaanSaya.length ? (
            permintaanSaya.map(currentValue => {
              return (
                <BukuDraft
                  key={currentValue.id_pinjam}
                  judul={currentValue.judul}
                  kategori={currentValue.kategori}
                  gambar={currentValue.foto}
                  pesan={moment(currentValue.tanggal_pesan).format(
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
            <BelumLogin pesan="Belum ada buku yang dipesan, Silahkan pesan buku terlebih dahulu" />
          )}
        </ScrollView>
      ) : (
        <BelumLogin navigation={navigation} type="login" />
      )}
    </SafeAreaView>
  );
};

export default Permintaan;

const styles = StyleSheet.create({
  permintaan: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  content: {
    padding: ms(12),
    flexGrow: 1,
    backgroundColor: colors.primaryWhite,
  },
});
