import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ListBuku, NavbarSearch} from '../../components';
import {ms} from 'react-native-size-matters';
import {colors} from '../../res/colors';
import axios from 'axios';
import {baseUrl} from '../../helpers';

const Search = ({route, navigation}) => {
  const {title, type} = route.params;
  const [listBuku, setListBuku] = useState([]);

  const getBuku = async (judul = '') => {
    try {
      let res;
      if (title) {
        if (title === 'Buku Terbaru') {
          res = await axios.get(`${baseUrl}/buku/terbaru?search=${judul}`);
          setListBuku(res.data.data);
        } else {
          res = await axios.get(
            `${baseUrl}/buku/filter?judul=${judul}&kategori=${title}`,
          );
          setListBuku(res.data.data);
        }
      } else {
        if (judul.length > 0) {
          res = await axios.get(
            `${baseUrl}/buku?search_query=${judul}&page=0&limit=10`,
          );
          setListBuku(res.data.data);
        } else {
          setListBuku([]);
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  return (
    <SafeAreaView style={styles.search}>
      <NavbarSearch
        title={title}
        type={type}
        onChage={getBuku}
        onBack={() => navigation.navigate('Home')}
      />
      <SafeAreaView style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listBuku}
          renderItem={({item, index}) => (
            <ListBuku
              key={item.id}
              gambar={item.foto}
              judul={item.judul}
              kategori={item.kategori}
              stok={item.stok}
              penulis={item.penulis}
              penerbit={item.penerbit}
              onPress={() => navigation.navigate('Detail', {id: item.id})}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  content: {
    flexGrow: 1,
    padding: ms(12),
    paddingBottom: ms(32),
  },
});
