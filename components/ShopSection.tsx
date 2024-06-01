import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {ShopProduct} from "@/components/ShopProduct";

export function ShopSection(props: any) {

  const {section, index} = props

  return (
    <View style={{}}
          key={index}>

      <View style={{width: 'auto'}}>
        {/*TITULO DE LA SECCION*/}
        <View>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
            {section.name}
            {/*- {section.index}*/}
          </Text>
        </View>

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
                  <ShopProduct product={product} key={index}></ShopProduct>
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
