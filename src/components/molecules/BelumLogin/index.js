import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../res/colors';
import {ms} from 'react-native-size-matters';
import {CustomButton, Gap} from '../../atoms';

const BelumLogin = ({navigation, type, pesan}) => {
  let content;
  switch (type) {
    case 'login':
      content = (
        <View style={styles.belumLogin}>
          <FontAwesome5
            name="user-alt-slash"
            color={colors.background}
            size={ms(120)}
          />
          <Gap height={ms(32)} />
          <Text style={styles.textBelum}>Silahkan masuk terlebih dahulu</Text>
          <Text style={styles.textBelum}>menggunakan akun anggota</Text>
          <Gap height={ms(32)} />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="masuk"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      );
      break;

    default:
      content = (
        <View style={styles.belumLogin}>
          <MaterialCommunityIcons
            name="book-remove-multiple"
            color={colors.background}
            size={ms(120)}
          />
          <Gap height={ms(32)} />
          <Text style={styles.textBelum}>{pesan}</Text>
          <Gap height={ms(32)} />
        </View>
      );
      break;
  }

  return content;
};

export default BelumLogin;

const styles = StyleSheet.create({
  belumLogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryWhite,
  },
  buttonContainer: {
    width: '80%',
  },
  textBelum: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
    fontSize: ms(14),
    textAlign: 'center',
  },
});
