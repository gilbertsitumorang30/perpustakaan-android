import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BukuSaya, Detail, LihatGambar} from '../screens';

const Stack = createStackNavigator();
const BukuSayaRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="BukuSaya"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BukuSaya" component={BukuSaya} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="LihatGambar" component={LihatGambar} />
    </Stack.Navigator>
  );
};

export default BukuSayaRoutes;
