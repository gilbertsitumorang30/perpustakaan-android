import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../../res/colors';
import {ms} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const Info = ({sukses, pesan, ok}) => {
  return (
    <View style={styles.info}>
      <View style={styles.overlay}></View>
      <View style={styles.contentContainer}>
        {sukses ? (
          <Feather
            name="check-circle"
            size={ms(80)}
            color={colors.primaryTheme}
          />
        ) : (
          <AntDesign name="closecircleo" size={ms(80)} color={colors.gagal} />
        )}
        <Text style={styles.pesan}>{pesan}</Text>
        <TouchableOpacity style={styles.okContainer} onPress={ok}>
          <Text style={styles.ok}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  info: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: colors.background,
    opacity: 0.7,
    height: height,
    width: width,
  },
  contentContainer: {
    position: 'absolute',
    backgroundColor: colors.primaryWhite,
    elevation: 2,
    borderRadius: ms(8),
    padding: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: '68%',
    paddingTop: ms(32),
  },

  okContainer: {
    backgroundColor: colors.primaryTheme,
    alignSelf: 'flex-end',
    borderRadius: ms(4),
  },
  ok: {
    textAlign: 'center',
    fontSize: ms(12),
    color: colors.primaryWhite,
    fontFamily: 'Poppins-Bold',
    paddingVertical: ms(2),
    paddingHorizontal: ms(8),
  },
  pesan: {
    textAlign: 'center',
    fontSize: ms(12),
    color: colors.textDark,
    marginVertical: ms(12),
    fontFamily: 'Poppins-Regular',
  },
});
