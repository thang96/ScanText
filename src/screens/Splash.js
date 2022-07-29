import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
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
  }, [isReady]);
  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground style={styles.background} source={images.background}>
        <Animated.Image
          style={{
            tintColor: 'rgb(2,255,255)',
            width: 250,
            height: 250,
            transform: [{scale: scaleValue}],
          }}
          source={icons.scan}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(5,11,41)',
  },
});

export default Splash;
