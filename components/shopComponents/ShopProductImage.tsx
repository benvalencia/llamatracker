import {Animated, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from "react";

export function ShopProductImage(props: any) {

  const {assets} = props

  const animation = useRef(new Animated.Value(0)).current;
  const [imageIndex, setImageIndex] = useState(0);

  const imageSource = assets[imageIndex].background;

  const ANIMATION_DURATION = 15000; // you can add your own animation time in ms

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ).start();

  }, []);

  animation.addListener(({value}) => {
    const newIndex = Math.floor(value * assets.length);
    setImageIndex(newIndex);
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          // IMAGE STYLE
          styles.image,
          // IMAGE SIZE
          {
            transform: [{translateY: 45}],
          }
        ]
        }
        source={{uri: imageSource}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 380,
  },
});
