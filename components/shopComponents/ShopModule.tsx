import {StyleSheet, Text, View} from 'react-native';
import React from "react";
import {Colors} from "@/constants/Colors";
import {ShopSection} from "@/components/shopComponents/ShopSection";

export function ShopModule(props: any) {

  const {module, index} = props

  return (
    <View style={{}}
          key={index}>
      <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
        {/*TITULO MODULO*/}
        <View>
          <Text style={{
            color: 'white',
            fontSize: 25,
            fontWeight: '500',
            paddingLeft: 5
          }}>{module.category}</Text>
        </View>
        {/*SECTIONS*/}
        {module.sections.map((section: any, index: number) => {
          return (
            <ShopSection module={module.category} section={section} key={index}></ShopSection>
          )
        })}
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
