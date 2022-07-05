import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BukuSaya, Detail, LihatGambar, Permintaan} from '../screens';

const Stack = createStackNavigator();
const PermintaanRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="PermintaanRoutes"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Permintaan" component={Permintaan} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="LihatGambar" component={LihatGambar} />
    </Stack.Navigator>
  );
};

export default PermintaanRoutes;
