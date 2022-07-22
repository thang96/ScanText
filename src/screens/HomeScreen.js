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
import common from '../utils/common';
import styles from '../resource/styles/styleHomeScreen';
const HomeScreen = () => {
  const navigation = useNavigation();
  const scanValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    scanAnimated();
  }, []);

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
  const [photo, setPhoto] = useState(false);
  const pickSingleWithCamera = () => {
    ImagePicker.openCamera({
      width: 1080,
      height: 1920,
      cropping: true,
    }).then(async image => {
      image.uri = image.path;
      setSendImage(true);
      const imageConverted = await common.resizeImageNotVideo(image);
      await postImg(imageConverted).then(data => {
        setSendImage(false);
        navigation.navigate('CameraCrop', {params: imageConverted, data});
      });
    });
  };

  if (sendImage) return <ActivityIndicator size="large" color="#0000ff" />;
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
          onPress={() => pickSingleWithCamera()}
          style={styles.buttonCamera}>
          <Image source={icons.ic_camera} style={{width: 30, height: 30}} />
          <Text style={{fontWeight: 'bold', color: 'white'}}>Open</Text>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
