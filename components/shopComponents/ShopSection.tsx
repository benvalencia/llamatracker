import {Dimensions, Pressable, Text, View} from 'react-native';
import React from "react";
import {CommonActions, useTheme} from "@react-navigation/native";
import {useNavigation} from "expo-router";
import {ShopProduct} from "@/components/shopComponents/ShopProduct";
import {FlashList} from "@shopify/flash-list";

export function ShopSection(props: any) {
  const {colors} = useTheme();

  const {module, section} = props

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
  const isJamTracks = section.name === 'Jam Tracks';

  return (
    <View style={{width: 'auto'}}>
      {/*TITULO DE LA SECTION*/}
      {module !== section.name
        ? <Text style={{color: colors.text, fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
          {section.name}
        </Text>
        : null}

      {/*300*/}
      <FlashList
        renderItem={({item, index}: any) => {
          if (!isJamTracks) {
            if (item.size === 'Size_1_x_1') {
              size1x1Counter = size1x1Counter + 1

              if (section.products[index + 1]?.size !== 'Size_1_x_1') {
                isAlone = !(size1x1Counter % 2 === 0)
              } else {
                isAlone = false;
              }
            } else {
              size1x1Counter = 0;
            }
          }

          return (<Pressable onPress={() => goToProductDetail(item)} key={index}>
              <ShopProduct isJamTracks={isJamTracks} isAlone={isAlone} product={item}
                           key={index}></ShopProduct>
            </Pressable>
          );
        }}
        estimatedItemSize={20}
        estimatedListSize={{height: isJamTracks ? 155 : 250, width: Dimensions.get("screen").width}}
        data={section.products}
        collapsable={true}
        horizontal={true}
      />
    </View>
  );
}
