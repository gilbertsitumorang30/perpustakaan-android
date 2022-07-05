import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/context/AuthContext';
import AuthRoutes from './src/routes/AuthRoutes';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
