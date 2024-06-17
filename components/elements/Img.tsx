import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Image} from "expo-image";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Img = ({onLoad, style, ...rest}: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
    <View>
      <Image
        onLoad={event => {
          onLoad?.(event)
          setIsLoaded(true);
        }}
        placeholder={{blurhash}}
        style={[style]}
        {...rest}
      />
      {!isLoaded && (
        <View style={[StyleSheet.absoluteFill, styles.spinner]}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
