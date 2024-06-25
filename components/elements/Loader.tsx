import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {useTheme} from "@react-navigation/native";
import {Fonts} from "@/constants/Colors";

export const Loader = ({onLoad}: any) => {
  const {colors} = useTheme();
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
    <View style={{alignItems: 'center', gap: 15}}>
      <Image
        onLoad={event => {
          onLoad?.(event)
          setIsLoaded(true);
        }}
        style={{height: 140, width: 140}}
        source={require('../../assets/images/logo/icons8-fortnite-llama-240.png')}
      />
      <View style={{gap: 10}}>
        <Text style={{color: colors.text, fontSize: Fonts.size.xl, fontWeight: Fonts.weight.light}}>Loading</Text>
        <ActivityIndicator></ActivityIndicator>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
