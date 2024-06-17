import {Text, View} from 'react-native';
import React from "react";

export function ShopProductBanner(props: any) {

  const {banner, align} = props

  return (
    <View style={{
      backgroundColor: banner.intensity === 'Low' ? 'white' : 'yellow',
      padding: 2,
      borderRadius: 25,
      paddingLeft: 10,
      paddingRight: 10,
      alignSelf: align ? align : 'flex-start'
    }}>
      <Text>{banner.name}</Text>
    </View>
  );
}
