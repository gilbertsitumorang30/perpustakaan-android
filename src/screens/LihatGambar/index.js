import {View, ImageBackground, Dimensions} from 'react-native';
import React from 'react';
import {colors} from '../../res/colors';

const screen = Dimensions.get('window');

const LihatGambar = ({route}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.primaryWhite}}>
      <ImageBackground
        resizeMode="contain"
        source={{uri: route.params.gambar}}
        style={{width: screen.width, height: screen.height}}
      />
    </View>
  );
};

export default LihatGambar;
