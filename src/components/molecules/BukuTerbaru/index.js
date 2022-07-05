import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';
import {Gap} from '../../atoms';

const BukuTerbaru = ({gambar, judul, kategori, ...res}) => {
  return (
    <TouchableOpacity style={styles.bukuTerbaru} {...res}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: gambar,
          }}
        />
      </View>
      <Gap height={4} />
      <Text numberOfLines={1} style={styles.judul}>
        {judul}
      </Text>
      <Text numberOfLines={1} style={styles.kategori}>
        {kategori}
      </Text>
    </TouchableOpacity>
  );
};

export default BukuTerbaru;

const styles = StyleSheet.create({
  bukuTerbaru: {
    marginRight: ms(16),
    width: ms(88),
    backgroundColor: colors.primaryWhite,
    borderBottomColor: colors.background,
    borderBottomWidth: 1,
    borderRightColor: colors.background,
    borderRightWidth: 1,
    borderBottomRightRadius: ms(8),
    paddingRight: ms(8),
  },
  imageContainer: {
    height: ms(100),
    width: ms(80),
    elevation: 2,
    borderRadius: ms(4),
    overflow: 'hidden',
    backgroundColor: colors.primaryWhite,
  },
  image: {
    flex: 1,
  },
  judul: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(9),
    color: colors.textDark,
  },
  kategori: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(8),
    color: colors.textLight,
  },
});
