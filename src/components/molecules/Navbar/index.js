import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Evilicons from 'react-native-vector-icons/EvilIcons';

const Navbar = ({barClick, searchClick, title, isSearch}) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={barClick}>
        <Evilicons name="navicon" color={colors.primaryWhite} size={ms(26)} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isSearch ? (
        <TouchableOpacity onPress={searchClick}>
          <Ionicons name="search" color={colors.primaryWhite} size={ms(20)} />
        </TouchableOpacity>
      ) : (
        <View style={{width: ms(20)}}></View>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.primaryTheme,
    height: ms(48),
    borderBottomLeftRadius: ms(12),
    borderBottomRightRadius: ms(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: ms(12),
  },
  title: {
    color: colors.primaryWhite,
    fontFamily: 'Sofia-Regular',
    fontSize: ms(18),
    textAlign: 'center',
  },
});
