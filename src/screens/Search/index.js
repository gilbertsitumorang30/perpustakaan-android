import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
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
      <ScrollView contentContainerStyle={styles.content}>
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
      </ScrollView>
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
  },
});
