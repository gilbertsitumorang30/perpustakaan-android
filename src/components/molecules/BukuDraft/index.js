import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const BukuDraft = ({
  gambar,
  judul,
  kategori,
  pinjam,
  kembali,
  status,
  batas,
  terlambat,
  pesan,
  ...res
}) => {
  let content;

  switch (status) {
    case 'masa peminjaman':
      content = (
        <Text
          numberOfLines={1}
          style={[styles.status, {backgroundColor: colors.flashGreen}]}>
          {status}
        </Text>
      );
      break;
    case 'tepat':
      content = (
        <Text
          numberOfLines={1}
          style={[styles.status, {backgroundColor: colors.flashGreen}]}>
          {status + ' waktu'}
        </Text>
      );
      break;
    case 'menunggu':
      content = (
        <Text
          numberOfLines={1}
          style={[styles.status, {backgroundColor: colors.primaryYellow}]}>
          {status}
        </Text>
      );
      break;
    case 'telat':
      content = (
        <Text
          numberOfLines={1}
          style={[styles.status, {backgroundColor: colors.gagal}]}>
          {`${status} ${terlambat} hari`}
        </Text>
      );
      break;
    default:
      content = (
        <Text
          numberOfLines={1}
          style={[styles.status, {backgroundColor: colors.gagal}]}>
          {'Rp. ' + status}
        </Text>
      );
      break;
  }

  return (
    <View>
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
          {pesan ? (
            <Text numberOfLines={1} style={styles.kategori}>
              {`pesan : ${pesan}`}
            </Text>
          ) : (
            <View>
              <Text numberOfLines={1} style={styles.kategori}>
                {`pinjam : ${pinjam}`}
              </Text>
              <Text numberOfLines={1} style={styles.kategori}>
                {`batas : ${batas}`}
              </Text>
              {kembali ? (
                <Text numberOfLines={1} style={styles.kategori}>
                  {`kembali : ${kembali}`}
                </Text>
              ) : null}
            </View>
          )}
        </View>
        {content}
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.hapus}>
        {status === 'menunggu' ? (
          <View style={styles.iconHapus}>
            <FontAwesomeIcon name="close" size={ms(18)} color={colors.gagal} />
          </View>
        ) : null}
      </TouchableOpacity> */}
    </View>
  );
};

export default BukuDraft;

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
    maxWidth: ms(80),
    borderRadius: ms(4),
    color: colors.primaryWhite,
  },
  hapus: {
    position: 'absolute',
    right: ms(12),
    top: 0,
  },
  iconHapus: {
    width: ms(24),
    height: ms(24),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(12),
    backgroundColor: colors.background,
  },
});
