import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {CommonActions} from "@react-navigation/native";
import {useNavigation} from "expo-router";
import {ShopProduct} from "@/components/shopComponents/ShopProduct";

export function ShopSection(props: any) {

  const {module, section, index} = props

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

  return (
    <View style={{}}
          key={index}>

      <View style={{width: 'auto'}}>
        {/*TITULO DE LA SECTION*/}
        {module !== section.name
          ? <View>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
              {section.name}
            </Text>
          </View>
          : null}

        <ScrollView
          horizontal={true}
        >
          <View style={{
            display: "flex",
            flexDirection: 'column',
            height: 235,
            flexWrap: 'wrap',
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 5,
          }}>
            {
              section.products.map((product: any, index: number) => {
                return (
                  <Pressable onPress={() => goToProductDetail(product)} key={index}>
                    <ShopProduct product={product} key={index}></ShopProduct>
                  </Pressable>
                )
              })}
          </View>
        </ScrollView>

      </View>
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
