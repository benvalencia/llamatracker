import {Text, View} from 'react-native';
import React from "react";
import {ShopSection} from "@/components/shopComponents/ShopSection";
import {useTheme} from "@react-navigation/native";
import {Fonts} from "@/constants/Colors";

export function ShopModule(props: any) {
  const {colors} = useTheme();

  const {module} = props

  const moduleName = module.category ? module.category : [...module.sections].reverse()[0].name;

  return (
    <View style={{width: 'auto', gap: 5}}>
      {/*TITULO MODULO*/}
      <View style={{paddingLeft: 5}}>
        <Text style={{
          color: colors.text,
          fontSize: Fonts.size.l,
          fontWeight: Fonts.weight.bold,
        }}>{moduleName}</Text>
      </View>
      {/*SECTIONS*/}
      {module.sections.map((section: any, index: number) => {
        return (
          <ShopSection module={moduleName} section={section} key={index}></ShopSection>
        )
      })}
    </View>
  );
}
