import React from 'react';
import {View} from "react-native";
import {ImageNativeProps} from "expo-image/src/Image.types";
import {Image} from "expo-image";

type ImgProps = ImageNativeProps;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Img = ({...rest}) => {
  return (
    <View>
      <Image {...rest}
             placeholder={{blurhash}}
             transition={1000}
      />
      {/*<Image*/}
      {/*  style={rest.style}*/}
      {/*  source="https://picsum.photos/seed/696/3000/2000"*/}
      {/*  contentFit="cover"*/}
      {/*/>*/}
    </View>
  )
}
