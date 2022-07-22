import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import Svg, {Polyline, Line, Path} from 'react-native-svg';
import {icons, images} from '../constans';

const Splash = () => {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    scaleAnimated();
  }, []);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const scaleAnimated = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  useEffect(() => {
    const login = setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);
  useEffect(() => {
    if (!isReady) return;
    navigation.navigate('HomeScreen');
    // navigation.navigate('CameraCrop');
  }, [isReady]);
  return (
    <SafeAreaView style={[styles.container]}>
      <Animated.Image
        style={{width: 300, height: 300, transform: [{scale: scaleValue}]}}
        source={icons.camera}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2))',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
