import {
  Canvas,
  Circle,
  Path,
  Rect,
  Skia,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import styles from './styles';

const {width, height} = Dimensions.get('window');

function ArcSlider({getEmoji, sendPercentData}: any) {
  const [percent, setPercent] = useState();
  const [text, setText] = useState();

  const strokeWidth = 20;
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - 40;
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;
  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;
  const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const rawForegroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(rawForegroundPath);

  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);
  const previousPositionX = useSharedValue(x2);
  const previousPositionY = useSharedValue(y2);
  const percentComplete = useSharedValue(0);

  const skiaCx = useValue(x2);
  const skiaCy = useValue(y2);
  const skiaPercentComplete = useValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(({translationX, translationY, absoluteX}) => {
      const oldCanvasX = translationX + previousPositionX.value;
      const oldCanvasY = translationY + previousPositionY.value;

      const xPrime = oldCanvasX - center;
      const yPrime = -(oldCanvasY - center);
      const rawTheta = Math.atan2(yPrime, xPrime);

      let newTheta;

      if (absoluteX < width / 2 && rawTheta < 0) {
        newTheta = Math.PI;
      } else if (absoluteX > width / 2 && rawTheta <= 0) {
        newTheta = 0;
      } else {
        newTheta = rawTheta;
      }

      const percent = 1 - newTheta / Math.PI;
      percentComplete.value = percent;

      const newCoords = polar2Canvas(
        {
          theta: newTheta,
          radius: r,
        },
        {
          x: center,
          y: center,
        },
      );

      movableCx.value = newCoords.x;
      movableCy.value = newCoords.y;
    })
    .onEnd(() => {
      previousPositionX.value = movableCx.value;
      previousPositionY.value = movableCy.value;
    });

  useSharedValueEffect(
    () => {
      skiaCx.current = movableCx.value;
      skiaCy.current = movableCy.value;
      skiaPercentComplete.current = percentComplete.value;

      if (percentComplete.value >= 1.05) {
        const newX = x2 - (center - previousPositionX.value);
        const newY = y2 - (center - previousPositionY.value);

        const clampedX = Math.min(Math.max(x1, newX), x2);
        const clampedY = Math.min(Math.max(y1, newY), y2);

        movableCx.value = clampedX;
        movableCy.value = clampedY;

        previousPositionX.value = clampedX;
        previousPositionY.value = clampedY;

        percentComplete.value = 1;
      }

      if (percentComplete.value > 0) {
        setPercent(percentComplete.value.toFixed(1));
      }
    },
    movableCx,
    movableCy,
    percentComplete,
  );

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return <View />;
  }

  useEffect(() => {
    // Her 0.2 değişimde yapılacak işlemler
    const interval = setInterval(() => {
      if (percentComplete.value >= 1) {
        clearInterval(interval);
        return;
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let emojiData;
    if (percent) {
      emojiData = getEmoji(percent);
    } else {
      emojiData = getEmoji(0);
    }
    setText(emojiData);
    sendPercentData(percent);
  }, [percent]);

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <GestureDetector gesture={gesture}>
          <View style={styles.container}>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{text?.emoji}</Text>
              <Text style={styles.valueDesc}>{text?.description}</Text>
            </View>
            <Canvas style={styles.canvas}>
              <Rect x={0} y={0} width={width} height={height} color="white" />
              <Path
                path={skiaBackgroundPath}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeCap="round"
                color={'grey'}
              />
              <Path
                path={skiaForegroundPath}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeCap="round"
                color={'royalblue'}
                start={0}
                end={skiaPercentComplete}
              />
              <Circle
                cx={skiaCx}
                cy={skiaCy}
                r={20}
                color="royalblue"
                style="fill"
              />
              <Circle
                cx={skiaCx}
                cy={skiaCy}
                r={15}
                color="white"
                style="fill"
              />
            </Canvas>
          </View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

export default ArcSlider;
