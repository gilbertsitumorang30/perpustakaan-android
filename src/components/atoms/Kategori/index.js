import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';
import LinearGradient from 'react-native-linear-gradient';

const Kategori = ({title, ...res}) => {
  return (
    <TouchableOpacity {...res}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        colors={['#11998e', '#38ef7d']}
        style={styles.kategori}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Kategori;

const styles = StyleSheet.create({
  kategori: {
    paddingVertical: ms(4),
    paddingHorizontal: ms(8),
    marginRight: ms(8),
    borderRadius: ms(8),
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ms(10),
    color: colors.primaryWhite,
  },
});
