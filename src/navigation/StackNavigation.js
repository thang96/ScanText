import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, Splash, CameraCrop} from '../screens';
import ResponseMessage from '../screens/ResponseMessage';
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ResponseMessage"
        component={ResponseMessage}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
