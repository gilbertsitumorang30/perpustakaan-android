import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {baseUrl} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../helpers/navigate';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const [pesan, setPesan] = useState(null);

  const login = async (nis, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/anggota/masuk`, {
        nomor_induk_siswa: nis,
        password: password,
      });
      const userToken = res.data.token;
      if (userToken) {
        setToken(userToken);
        AsyncStorage.setItem('@token', userToken);
        setToken(userToken);
        navigate('HomeRootRoutes');
      }
    } catch (error) {
      console.log('error', error.response);
      setPesan(error.response.data.msg);
      setInfo(true);
    } finally {
      setLoading(false);
    }
  };

  const isLogged = async () => {
    try {
      const userToken = await AsyncStorage.getItem('@token');
      setToken(userToken);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, token, setToken, loading, info, setInfo, pesan, setPesan}}>
      {children}
    </AuthContext.Provider>
  );
};
