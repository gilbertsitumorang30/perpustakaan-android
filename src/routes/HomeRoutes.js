import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Detail, Home, LihatGambar, Search} from '../screens';

const Stack = createStackNavigator();
const HomeRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="LihatGambar" component={LihatGambar} />
    </Stack.Navigator>
  );
};

export default HomeRoutes;
