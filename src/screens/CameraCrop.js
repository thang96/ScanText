import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {icons, images} from '../constans';
import DragAndDrop from '../components/DragAndDrop';
import Svg, {Polyline, Line, Path} from 'react-native-svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import {postImageAndPosition} from '../apis/apis';
import styles from '../resource/styles/styleCameraCrop';
import SvgPoint from '../components/SvgPoint';
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const CameraCrop = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const image = route.params.params.uri;
  const scale = route.params.scale;
  const [isDrag, setIsDrag] = useState(false);
  const [point, setpoint] = useState({x: 0, y: 0});
  const [resposeData, setResposeData] = useState('');
  const [keyboardIsShow, setKeyBoardIsShow] = useState(false);
  const [point1, setpoint1] = useState({
    x: route.params.data.tl[0] / scale,
    y: route.params.data.tl[1] / scale,
  });
  const [point2, setpoint2] = useState({
    x: route.params.data.tr[0] / scale,
    y: route.params.data.tr[1] / scale,
  });
  const [point3, setpoint3] = useState({
    x: route.params.data.br[0] / scale,
    y: route.params.data.br[1] / scale,
  });
  const [point4, setpoint4] = useState({
    x: route.params.data.bl[0] / scale,
    y: route.params.data.bl[1] / scale,
  });
  const widthImage = 1080 / scale;
  const heightImage = 1920 / scale;

  const onDragActive = useCallback(
    debounce(position => {
      setpoint({x: position.x, y: position.y});
    }, 20),
    [],
  );
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyBoardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardIsShow(false);
    });
  }, []);
  const postData = () => {
    const img = route.params.params;
    const tlX = point1.x * scale;
    const tlY = point1.y * scale;
    const trX = point2.x * scale;
    const trY = point2.y * scale;
    const brX = point3.x * scale;
    const brY = point3.y * scale;
    const blX = point4.x * scale;
    const blY = point4.y * scale;
    const data = {img, tlX, tlY, trX, trY, brX, brY, blX, blY};
    postImageAndPosition(data).then(res => {
      setResposeData(res.card_no);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonBack}>
            <Image
              source={icons.back}
              style={{width: 30, height: 30, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <Text style={styles.titleTop}>Camera Crop</Text>
        </View>
        <ScrollView style={styles.container}>
          {keyboardIsShow == false && (
            <View style={[styles.container, styles.viewImage]}>
              <ImageBackground
                resizeMode="cover"
                source={{uri: `${image}`}}
                style={{width: widthImage, height: heightImage}}>
                <SvgPoint
                  point1={point1}
                  point2={point2}
                  point3={point3}
                  point4={point4}
                  widthImage={widthImage}
                  heightImage={heightImage}
                />
                <DragAndDrop
                  styleBox={{
                    position: 'absolute',
                    left: -17,
                    top: -17,
                    transform: [{rotate: '135deg'}],
                  }}
                  x={point1.x}
                  y={point1.y}
                  limitationHeight={heightImage}
                  limitationWidth={widthImage}
                  minX={0}
                  minY={0}
                  onDragActive={position => {
                    setIsDrag(position.active);
                    onDragActive(position);
                  }}
                  onDragEnd={position => {
                    setpoint1({x: position.x, y: position.y});
                    setIsDrag(position.active);
                  }}
                />
                <DragAndDrop
                  styleBox={{
                    position: 'absolute',
                    left: -3,
                    top: -17,
                    transform: [{rotate: '-135deg'}],
                  }}
                  x={point2.x}
                  y={point2.y}
                  limitationHeight={heightImage}
                  limitationWidth={widthImage}
                  minX={0}
                  minY={0}
                  onDragActive={position => {
                    setIsDrag(position.active);
                    onDragActive(position);
                  }}
                  onDragEnd={position => {
                    setpoint2({x: position.x, y: position.y});
                    setIsDrag(position.active);
                  }}
                />
                <DragAndDrop
                  styleBox={{
                    position: 'absolute',
                    left: -3,
                    top: -3,
                    transform: [{rotate: '-45deg'}],
                  }}
                  x={point3.x}
                  y={point3.y}
                  limitationHeight={heightImage}
                  limitationWidth={widthImage}
                  minX={0}
                  minY={0}
                  onDragActive={position => {
                    setIsDrag(position.active);
                    onDragActive(position);
                  }}
                  onDragEnd={position => {
                    setpoint3({x: position.x, y: position.y});
                    setIsDrag(position.active);
                  }}
                />
                <DragAndDrop
                  styleBox={{
                    position: 'absolute',
                    left: -17,
                    top: -3,
                    transform: [{rotate: '45deg'}],
                  }}
                  x={point4.x}
                  y={point4.y}
                  limitationHeight={heightImage}
                  limitationWidth={widthImage}
                  minX={0}
                  minY={0}
                  onDragActive={position => {
                    setIsDrag(position.active);
                    onDragActive(position);
                  }}
                  onDragEnd={position => {
                    setpoint4({x: position.x, y: position.y});
                    setIsDrag(position.active);
                  }}
                />
                {isDrag && (
                  <View
                    style={[
                      styles.viewScale,
                      {left: point.x > widthImage / 2 ? 0 : widthImage - 100},
                    ]}>
                    <View style={styles.viewScope}>
                      <View style={styles.viewPoint} />

                      <Image
                        source={{uri: `${image}`}}
                        style={[
                          {width: widthImage, height: heightImage},
                          {
                            transform: [
                              {
                                translateX: -point.x + 55,
                              },
                              {
                                translateY: -point.y + 55,
                              },
                            ],
                          },
                        ]}
                      />
                    </View>
                  </View>
                )}
              </ImageBackground>
            </View>
          )}
          {resposeData && (
            <TextInput
              hitSlop={{bottom: 100, left: 400, right: 400, top: 100}}
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}
              value={`Position:${resposeData}`}
              onChangeText={text => setResposeData(text)}
            />
          )}
        </ScrollView>

        <View style={styles.headerBottom}>
          {resposeData === '' ? (
            <CustomButton
              styleLabel={{color: 'white'}}
              styleIcon={{tintColor: 'white'}}
              icon={icons.send}
              label={'Send Position'}
              onPress={() => postData()}
            />
          ) : (
            <CustomButton
              styleLabel={{color: 'white'}}
              styleIcon={{color: 'white'}}
              icon={icons.confirm}
              label={'Confirm'}
              onPress={() =>
                alert('Continue... send position to another server')
              }
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default CameraCrop;
