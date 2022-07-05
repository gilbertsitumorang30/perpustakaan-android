import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Gap} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {baseUrl} from '../../../helpers';
import {AuthContext} from '../../../context/AuthContext';
import {navigate} from '../../../helpers/navigate';
import {DialogKonfirmasi} from '../../../components';
import LoadingOverlay from '../../atoms/LoadingOverlay';

const CustomDrawer = props => {
  const [anggota, setAnggota] = useState({});
  const {token, setToken} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDetailAnggota = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value) {
        const res = await axios.get(
          `${baseUrl}/anggota/${jwt_decode(value).id}`,
        );
        setAnggota(res.data.data);
      }
    } catch (error) {
      console.log('error:', error.response);
    }
  };

  const logout = () => {
    setVisible(false);
    setLoading(true);
    setTimeout(() => {
      setToken(null);
      AsyncStorage.removeItem('@token');
      setLoading(false);
      navigate('Login');
    }, 2000);
  };

  useEffect(() => {
    getDetailAnggota();
  }, [token, anggota]);

  return (
    <View style={styles.customDrawer}>
      <DialogKonfirmasi
        type={'keluar'}
        visible={visible}
        batal={() => setVisible(false)}
        ok={logout}
      />
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.drawerProfilBackground}>
          {token ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Akun', {anggota});
              }}>
              <View style={styles.fotoProfilContainer}>
                <View style={styles.fotoProfilContainer}>
                  <Image
                    source={{
                      uri: anggota.foto,
                    }}
                    style={styles.fotoProfil}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text numberOfLines={1} style={styles.nama}>
                {anggota.nama}
              </Text>
              <Text style={styles.nis}>{anggota.nomor_induk_siswa}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginContainer}>
              <Text style={styles.silahkan}>
                Silahkan masuk terlebih dahulu
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
                style={styles.harusLogin}>
                <Text style={styles.loginText}>Masuk</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.containerList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {token ? (
        <View style={styles.logout}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={styles.tombolLogout}>
            <Feather name="power" size={ms(16)} color={colors.textDark} />
            <Gap width={ms(10)} />
            <Text style={styles.textKeluar}>Keluar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
      <LoadingOverlay loading={loading} />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  customDrawer: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: colors.primaryTheme,
  },
  drawerProfilBackground: {
    height: ms(140),
    backgroundColor: colors.primaryTheme,
    justifyContent: 'center',
    padding: ms(16),
  },
  fotoProfilContainer: {
    height: ms(60),
    width: ms(60),
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: ms(8),
  },
  fotoProfil: {
    flex: 1,
  },
  nama: {
    color: colors.primaryWhite,
    fontSize: ms(14),
    fontFamily: 'Poppins-SemiBold',
  },
  nis: {
    color: colors.primaryWhite,
    fontSize: ms(10),
    fontFamily: 'Poppins-Regular',
  },
  containerList: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    paddingTop: ms(10),
  },
  logout: {
    padding: ms(4),
    borderTopWidth: 1,
    borderTopColor: colors.textLight,
  },
  tombolLogout: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textKeluar: {
    fontSize: ms(12),
    color: colors.textDark,
    fontFamily: 'Poppins-Regular',
  },
  harusLogin: {
    backgroundColor: colors.primaryWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(4),
    width: ms(64),
    marginTop: ms(12),
  },
  loginText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: ms(10),
    paddingVertical: ms(4),
  },
  silahkan: {
    color: colors.primaryWhite,
    fontFamily: 'Poppins-Regular',
    fontSize: ms(14),
  },
  loginContainer: {
    width: ms(200),
  },
});
