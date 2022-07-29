import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <StackNavigation />
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
