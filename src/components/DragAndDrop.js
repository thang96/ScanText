import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {icons, images} from '../constans';

const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const DragAndDrop = props => {
  const {
    x,
    y,
    limitationHeight,
    limitationWidth,
    minX,
    minY,
    onDragEnd,
    children,
    style,
    onDragActive,
    styleBox,
  } = props;
  const xRef = useRef(x);
  const yRef = useRef(y);
  const boxX = useSharedValue(0);
  const boxY = useSharedValue(0);

  useEffect(() => {
    boxX.value = withTiming(xRef.current);
    boxY.value = withTiming(yRef.current);
  }, [boxX, boxY]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
    },
    onActive: (ev, ctx) => {
      boxX.value = clamp(ctx.offsetX + ev.translationX, minX, limitationWidth);
      boxY.value = clamp(ctx.offsetY + ev.translationY, minY, limitationHeight);
      if (onDragActive) {
        runOnJS(onDragActive)({
          x: boxX.value,
          y: boxY.value,
          active: true,
        });
      }
    },
    onFinish: () => {
      if (onDragEnd) {
        runOnJS(onDragEnd)({
          x: boxX.value,
          y: boxY.value,
          active: false,
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: boxX.value,
      },
      {
        translateY: boxY.value,
      },
    ],
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }));
  const styles = useMemo(
    () =>
      StyleSheet.create({
        imageStyle: {
          height: 15,
          width: 15,
        },
      }),
    [],
  );

  return (
    <>
      <PanGestureHandler
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedStyle, style]}>
          <Image
            source={icons.water2}
            style={[
              {
                width: 20,
                height: 20,
                // tintColor: 'rgb(0,255,0)',
              },
              styleBox,
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default DragAndDrop;
