import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import {colors} from '../../res/colors';

const LihatGambar = ({route}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.primaryWhite}}>
      <ImageBackground
        resizeMode="contain"
        source={{uri: route.params.gambar}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default LihatGambar;
