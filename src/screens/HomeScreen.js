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
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {icons, images} from '../constans';
import DragAndDrop from '../components/DragAndDrop';
import Svg, {Polyline, Line, Path} from 'react-native-svg';
import {Easing} from 'react-native-reanimated';
import CustomButton from '../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {postImg} from '../apis/apis';
const HomeScreen = () => {
  const navigation = useNavigation();
  const scanValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    scanAnimated();
  }, []);

  const [photo, setPhoto] = useState(false);
  const spin = scanValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 120],
  });
  const scanAnimated = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(scanValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  };
  const [sendImage, setSendImage] = useState(false);
  const pickSingleWithCamera = () => {
    ImagePicker.openCamera({
      width: 1080,
      height: 1920,
      cropping: true,
    }).then(async image => {
      console.log(image);
      setSendImage(true);
      await postImg(image).then(data => {
        console.log(data);
        setSendImage(false);
        navigation.navigate('CameraCrop', {params: image, data});
      });
    });
  };
  if (sendImage) return <ActivityIndicator size="small" color="#0000ff" />;
  return (
    <SafeAreaView style={styles.container}>
      <View
        onLayout={ev => {
          const layout = ev.nativeEvent.layout;
        }}
        style={styles.viewTop}>
        <View style={styles.viewScanTop}>
          <Image style={styles.imageScan} source={icons.document} />
          <Animated.View
            style={[styles.lineScan, {transform: [{translateY: spin}]}]}
          />
        </View>
      </View>

      <View style={styles.viewScanBottom}>
        <TouchableOpacity
          onPress={pickSingleWithCamera}
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <Image source={icons.ic_camera} style={{width: 30, height: 30}} />
          <Text style={{fontWeight: 'bold', color: 'white'}}>Open</Text>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  viewTop: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScanTop: {
    marginTop: 150,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'white',
    borderRadius: 10,
    transform: [{rotate: '25deg'}],
  },
  imageScan: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: [{rotate: '-15deg'}],
  },
  lineScan: {
    height: 2,
    backgroundColor: 'red',
    width: '50%',
    zIndex: 2,
    marginRight: 20,
  },
  viewScanBottom: {
    marginBottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default HomeScreen;
