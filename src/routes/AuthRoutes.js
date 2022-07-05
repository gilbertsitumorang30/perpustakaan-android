import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';
import {AuthContext} from '../context/AuthContext';
import {navigationRef} from '../helpers/navigate';
import HomeRootRoutes from './RootRoutes';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="RootRoutes"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeRootRoutes" component={HomeRootRoutes} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
