import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../res/colors';
import {ms} from 'react-native-size-matters';

const CustomButton = ({title, ...res}) => {
  return (
    <TouchableOpacity {...res} style={styles.customButton}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: colors.primaryTheme,
    borderRadius: ms(16),
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    paddingVertical: ms(8),
    color: colors.primaryWhite,
  },
});
