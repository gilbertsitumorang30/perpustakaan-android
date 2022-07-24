import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';

const ListBuku = ({
  gambar,
  judul,
  kategori,
  stok,
  penulis,
  penerbit,
  ...res
}) => {
  let status;
  if (stok > 0) {
    status = (
      <Text
        numberOfLines={1}
        style={[styles.status, {backgroundColor: colors.flashGreen}]}>
        tersedia
      </Text>
    );
  } else {
    status = (
      <Text
        numberOfLines={1}
        style={[styles.status, {backgroundColor: colors.background}]}>
        kosong
      </Text>
    );
  }

  return (
    <TouchableOpacity style={styles.listBuku} {...res}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: gambar,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.judul}>
          {judul}
        </Text>
        <Text numberOfLines={1} style={styles.kategori}>
          {kategori}
        </Text>
        <Text numberOfLines={1} style={styles.kategori}>
          {`penulis : ${penulis}`}
        </Text>
        <Text numberOfLines={1} style={styles.kategori}>
          {`penerbit : ${penerbit}`}
        </Text>
      </View>
      {status}
    </TouchableOpacity>
  );
};

export default ListBuku;

const styles = StyleSheet.create({
  listBuku: {
    flexDirection: 'row',
    marginBottom: ms(16),
    borderBottomColor: colors.background,
    borderBottomWidth: 1,
    borderRightColor: colors.background,
    borderRightWidth: 1,
    borderBottomRightRadius: ms(8),
    paddingBottom: ms(8),
    position: 'relative',
  },
  imageContainer: {
    height: ms(80),
    width: ms(60),
    elevation: 2,
    borderRadius: ms(4),
    overflow: 'hidden',
    backgroundColor: colors.primaryWhite,
    marginRight: ms(12),
  },
  image: {
    height: ms(80),
    width: ms(60),
  },

  textContainer: {},
  judul: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(12),
    color: colors.textDark,
    width: ms(248),
  },
  kategori: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(8),
    color: colors.textDark,
  },

  stok: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(8),
    color: colors.textDark,
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(8),
    position: 'absolute',
    bottom: ms(8),
    right: ms(8),
    paddingVertical: ms(2),
    paddingHorizontal: ms(8),
    borderRadius: ms(4),
    color: colors.primaryWhite,
  },
});
