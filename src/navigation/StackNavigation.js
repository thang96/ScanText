import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, Splash, CameraCrop} from '../screens';
const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CameraCrop"
        component={CameraCrop}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
