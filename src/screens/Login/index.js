import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomButton, Gap, InputForm} from '../../components';
import {AuthContext} from '../../context/AuthContext';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import Info from '../../components/molecules/Info';

const Login = ({navigation}) => {
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const {login, loading, info, pesan, setInfo, setPesan} =
    useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.login}>
      <View style={styles.top}>
        <Text style={styles.textTop}>Perpustakaan Digital</Text>
        <Text style={styles.textTop}>Yayayan Perguruan Sehati</Text>
        <Ionicons name="library" color={colors.primaryWhite} size={ms(110)} />
      </View>
      <View style={styles.form}>
        <Text style={styles.selamat}>Selamat Datang,</Text>
        <Text style={styles.silahkan}>
          Silahkan masuk menggunakan akun anggota.
        </Text>
        <Gap height={ms(32)} />
        <InputForm
          label="Nomor Induk Siswa"
          placeHolder="Contoh: 0064286066"
          onChangeText={newText => setNis(newText)}
        />
        <Gap height={ms(12)} />
        <InputForm
          label="Password"
          placeHolder="Masukkan password"
          typeInput="password"
          onChangeText={newText => setPassword(newText)}
        />
        <Gap height={ms(32)} />
        <CustomButton
          title="Masuk"
          onPress={() => {
            if (!nis.length) {
              setPesan('Harap mengisi nomor induk siswa');
              setInfo(true);
            } else if (!password.length) {
              setPesan('Harap mengisi password');
              setInfo(true);
            } else {
              login(nis, password);
            }
          }}
        />
      </View>
      <LoadingOverlay loading={loading} />
      {info && <Info pesan={pesan} ok={() => setInfo(false)} />}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flexGrow: 1,
    backgroundColor: colors.primaryTheme,
    position: 'relative',
    alignItems: 'center',
  },
  top: {
    height: ms(240),
    backgroundColor: colors.primaryTheme,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 2,
    backgroundColor: colors.primaryWhite,
    alignSelf: 'stretch',
    borderTopRightRadius: ms(18),
    borderTopLeftRadius: ms(18),
    paddingVertical: ms(24),
    paddingHorizontal: ms(12),
  },
  image: {
    height: '60%',
  },
  selamat: {
    color: colors.textDark,
    fontFamily: 'Poppins-Bold',
    fontSize: ms(18),
  },
  textTop: {
    fontFamily: 'Sofia-Regular',
    fontSize: ms(24),
    color: colors.primaryWhite,
  },
  silahkan: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(10),
    color: colors.textDark,
  },
});
