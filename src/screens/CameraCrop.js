import React, {useState, useEffect, useCallback} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {icons, images} from '../constans';
import DragAndDrop from '../components/DragAndDrop';
import Svg, {Polyline, Line, Path} from 'react-native-svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {postImageAndPosition} from '../apis/apis';
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const CameraCrop = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const image = route.params.params.path;
  const [isDrag, setIsDrag] = useState(false);
  const [point, setpoint] = useState({x: 0, y: 0});
  const [point1, setpoint1] = useState({
    x: route.params.data.tl[0] / 3.5,
    y: route.params.data.tl[1] / 3.5,
  });
  const [point2, setpoint2] = useState({
    x: route.params.data.tr[0] / 3.5,
    y: route.params.data.tr[1] / 3.5,
  });
  const [point3, setpoint3] = useState({
    x: route.params.data.br[0] / 3.5,
    y: route.params.data.br[1] / 3.5,
  });
  const [point4, setpoint4] = useState({
    x: route.params.data.bl[0] / 3.5,
    y: route.params.data.bl[1] / 3.5,
  });
  const widthImage = 1080 / 3.5;
  const heightImage = 1920 / 3.5;

  const onDragActive = useCallback(
    debounce(position => {
      setpoint({x: position.x, y: position.y});
    }, 20),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.viewImage]}>
        <ImageBackground
          onLayout={ev => {
            const layout = ev.nativeEvent.layout;
          }}
          resizeMode="cover"
          source={{uri: `${image}`}}
          style={{width: widthImage, height: heightImage}}>
          <Svg height={`${heightImage}`} width={`${widthImage}`}>
            <Line
              x1={point1.x}
              y1={point1.y}
              x2={point2.x}
              y2={point2.y}
              stroke="rgb(42,178,182)"
              strokeWidth="1"
            />
            <Line
              x1={point2.x}
              y1={point2.y}
              x2={point3.x}
              y2={point3.y}
              stroke="rgb(42,178,182)"
              strokeWidth="1"
            />
            <Line
              x1={point3.x}
              y1={point3.y}
              x2={point4.x}
              y2={point4.y}
              stroke="rgb(42,178,182)"
              strokeWidth="1"
            />
            <Line
              x1={point4.x}
              y1={point4.y}
              x2={point1.x}
              y2={point1.y}
              stroke="rgb(42,178,182)"
              strokeWidth="1"
            />
          </Svg>

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
      <View style={styles.headerTop}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <Image
            source={icons.back}
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 24, fontStyle: 'italic'}}>
          Camera Crop
        </Text>
      </View>
      <View style={styles.headerBottom}>
        <TouchableOpacity
          onPress={() => {
            const img = route.params.params;
            const tl = point1;
            const tr = point2;
            const br = point3;
            const bl = point4;
            const data = {img, tl, tr, br, bl};
            console.log(img, tl, tr, br, bl, 'data send');
            postImageAndPosition(data).then(data => {
              console.log(data.card_no);
              navigation.navigate('ResponseMessage', {data});
            });
          }}
          style={styles.buttonNext}>
          <Image
            source={icons.ic_right_arrow}
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  viewImage: {justifyContent: 'center', alignItems: 'center'},
  imageCrop: {
    width: 315,
    height: 495,
  },
  viewScale: {
    width: 100,
    height: 100,
    borderRadius: 60,
    position: 'absolute',
    top: -25,
    zIndex: 9999,
    overflow: 'hidden',
    backgroundColor: 'rgb(205,201,201)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScope: {
    transform: [{scale: 2}],
    width: 110,
    height: 110,
  },
  viewPoint: {
    width: 9,
    height: 9,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 2,
  },
  headerBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 56,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 1,
  },
  headerTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 56,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 1,
  },
  buttonBack: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  buttonNext: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraCrop;
