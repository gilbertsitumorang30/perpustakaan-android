import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Detail, LihatGambar, Riwayat} from '../screens';

const Stack = createStackNavigator();
const RiwayatRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="RiwayatRoutes"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Riwayat" component={Riwayat} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="LihatGambar" component={LihatGambar} />
    </Stack.Navigator>
  );
};

export default RiwayatRoutes;
