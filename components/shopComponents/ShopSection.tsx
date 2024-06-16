import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {CommonActions, useTheme} from "@react-navigation/native";
import {useNavigation} from "expo-router";
import {ShopProduct} from "@/components/shopComponents/ShopProduct";

export function ShopSection(props: any) {
  const {colors} = useTheme();


  const {module, section} = props

  const productCounter = section.products.length - 1;

  const navigation = useNavigation()

  const goToProductDetail = (product: any) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/shop/itemDetail',
        params: {
          product
        }
      }));
  }

  let size1x1Counter = 0;
  let isAlone = false;
  const isJamTracks = section.name == 'Jam Tracks';

  return (
    <View style={{width: 'auto'}}>
      {/*TITULO DE LA SECTION*/}
      {module !== section.name
        ? <Text style={{color: colors.text, fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
          {section.name}
        </Text>
        : null}

      <ScrollView
        horizontal={true}
      >
        <View style={{
          display: "flex",
          flexDirection: 'column',
          height: isJamTracks ? 300 : 235,
          flexWrap: 'wrap',
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
        }}>
          {
            section.products.map((product: any, index: number) => {
              if (!isJamTracks) {
                if (product.size == 'Size_1_x_1') {
                  size1x1Counter = size1x1Counter + 1

                  if (section.products[index + 1]?.size !== 'Size_1_x_1') {
                    isAlone = !(size1x1Counter % 2 == 0)
                  } else {
                    isAlone = false;
                  }
                } else {
                  size1x1Counter = 0;
                }
              }

              return (
                <Pressable onPress={() => goToProductDetail(product)} key={index}>
                  <ShopProduct isJamTracks={isJamTracks} isAlone={isAlone} product={product}
                               key={index}></ShopProduct>
                </Pressable>
              )
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
