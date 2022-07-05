import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../res/colors';
import {
  Akun,
  BukuSaya,
  Permintaan,
  Riwayat,
  Login,
  LihatGambar,
} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomDrawer} from '../components';
import HomeRoutes from './HomeRoutes';
import BukuSayaRoutes from './BukuSayaRoutes';

const Drawer = createDrawerNavigator();

import {createStackNavigator} from '@react-navigation/stack';
import PermintaanRoutes from './PermintaanRoutes';
import RiwayatRoutes from './RiwayatRoutes';

const Stack = createStackNavigator();

const HomeRootRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="RootRoutes"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="RootRoutes" component={RootRoutes} />
      <Stack.Screen name="Akun" component={Akun} />
      <Stack.Screen name="LihatGambar" component={LihatGambar} />
    </Stack.Navigator>
  );
};

export default HomeRootRoutes;

const RootRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.primaryTheme,
        drawerActiveTintColor: colors.primaryWhite,
        drawerLabelStyle: {
          marginLeft: ms(-22),
          fontSize: ms(10),
          fontFamily: 'Poppins-Regular',
        },
        drawerInactiveTintColor: colors.textDark,
      }}>
      <Drawer.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={ms(20)} color={color} />
          ),
          drawerLabel: 'Beranda',
        }}
      />
      <Drawer.Screen
        name="BukuSayaRoutes"
        component={BukuSayaRoutes}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="book-outline" size={ms(20)} color={color} />
          ),
          drawerLabel: 'Buku Saya',
        }}
      />
      <Drawer.Screen
        name="PermintaanRoutes"
        component={PermintaanRoutes}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons
              name="ios-arrow-redo-outline"
              size={ms(20)}
              color={color}
            />
          ),
          drawerLabel: 'Permintaan',
        }}
      />
      <Drawer.Screen
        name="RiwayatRotes"
        component={RiwayatRoutes}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="time-outline" size={ms(20)} color={color} />
          ),
          drawerLabel: 'Riwayat',
        }}
      />
    </Drawer.Navigator>
  );
};
