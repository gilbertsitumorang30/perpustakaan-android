import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../res/colors';
import {
  BelumLogin,
  BukuTerbaru,
  Gap,
  Kategori,
  ListBuku,
  Navbar,
} from '../../components';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {baseUrl} from '../../helpers';

const Home = ({navigation}) => {
  const [daftarKategori, setDaftarKategori] = useState([]);
  const [bukuTerbaru, setBukuTerbaru] = useState([]);
  const [listBuku, setListBuku] = useState([]);

  const batalOtomatis = async () => {
    try {
      await axios.put(`${baseUrl}/peminjaman/batal`);
    } catch (error) {
      console.log(error);
    }
  };

  const getKategori = async () => {
    try {
      const res = await axios.get(`${baseUrl}/kategori`);
      setDaftarKategori(res.data.data);
    } catch (error) {
      console.log('error:', error);
    }
  };

  const getBukuTerbaru = async () => {
    try {
      const res = await axios.get(`${baseUrl}/buku/terbaru?search`);
      setBukuTerbaru(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getListBuku = async () => {
    try {
      const res = await axios.get(`${baseUrl}/buku/terdaftar?search`);
      setListBuku(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    try {
      setRefreshing(true);
      getBukuTerbaru();
      getKategori();
      getListBuku();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    batalOtomatis();
    getKategori();
    getBukuTerbaru();
    getListBuku();
  }, []);

  return (
    <SafeAreaView style={styles.home}>
      <Navbar
        title="Perpustakaan"
        isSearch={true}
        barClick={() => navigation.openDrawer()}
        searchClick={() => navigation.navigate('Search', {type: 'search'})}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.kategori}>Kategori buku</Text>
        <View style={styles.kategoribuku}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={daftarKategori}
            renderItem={({item}) => (
              <Kategori
                title={item.kategori}
                onPress={() =>
                  navigation.navigate('Search', {title: item.kategori})
                }
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <Gap height={24} />
        <View style={styles.titleContainer}>
          <Text style={styles.kategori}>Buku terbaru</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Search', {title: 'Buku Terbaru'})
            }>
            <AntDesign
              name="arrowright"
              color={colors.textDark}
              size={ms(18)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.terbaru}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={bukuTerbaru}
            renderItem={({item, index}) => (
              <BukuTerbaru
                key={item.id}
                gambar={item.foto}
                judul={item.judul}
                kategori={item.kategori}
                onPress={() => navigation.navigate('Detail', {id: item.id})}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <Gap height={ms(24)} />
        <Text style={styles.kategori}>Daftar buku</Text>
        <View style={styles.daftar}>
          {listBuku.map(currentValue => {
            return (
              <ListBuku
                key={currentValue.id}
                gambar={currentValue.foto}
                judul={currentValue.judul}
                kategori={currentValue.kategori}
                stok={currentValue.stok}
                penulis={currentValue.penulis}
                penerbit={currentValue.penerbit}
                onPress={() =>
                  navigation.navigate('Detail', {id: currentValue.id})
                }
              />
            );
          })}
        </View>
        <Gap height={24} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  content: {
    padding: ms(12),
    flexGrow: 1,
    backgroundColor: colors.primaryWhite,
  },
  kategori: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.textDark,
    fontSize: ms(12),
    marginBottom: ms(8),
  },
  kategoribuku: {
    minHeight: ms(32),
  },
  terbaru: {
    flexDirection: 'row',
    minHeight: ms(120),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daftar: {
    flex: 1,
  },
});
