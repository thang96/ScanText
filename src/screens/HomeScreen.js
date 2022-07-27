import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {icons, images} from '../constans';
import {Easing} from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {postImg} from '../apis/apis';
import common from '../utils/common';
import styles from '../resource/styles/styleHomeScreen';
const HomeScreen = () => {
  const navigation = useNavigation();
  const scanValue = useRef(new Animated.Value(0)).current;
  const [zoomScale, setZooomScale] = useState(4);

  useEffect(() => {
    const dimension = Dimensions.get('window').height;
    if (dimension > 700) {
      setZooomScale(3.5);
    }
    scanAnimated();
  }, []);

  const spin = scanValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120],
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
      // image.uri = image.path;
      setSendImage(true);
      const imageConverted = await common.resizeImageNotVideo(image);
      await postImg(imageConverted).then(data => {
        setSendImage(false);
        const scale = zoomScale;
        navigation.navigate('CameraCrop', {
          params: imageConverted,
          data,
          scale,
        });
      });
    });
  };

  if (sendImage) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Scan your text</Text>
      <View style={styles.containerViewScan}>
        <Image style={styles.eachContainerViewScan} source={icons.crop} />
        <Image style={styles.childrenViewScan} source={icons.card} />
        <Animated.View
          style={[styles.lineScan, {transform: [{translateY: spin}]}]}
        />
      </View>

      <View></View>

      <View style={styles.viewScanBottom}>
        <TouchableOpacity
          onPress={() => pickSingleWithCamera()}
          style={styles.buttonCamera}>
          <Image source={icons.ic_camera} style={{width: 30, height: 30}} />
          <Text style={{fontWeight: 'bold', color: 'rgb(2,21,66)'}}>Open</Text>
          <Text style={{fontWeight: 'bold', color: 'rgb(2,21,66)'}}>
            Camera
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
