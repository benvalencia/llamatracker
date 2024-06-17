import {StyleSheet, Text, View} from 'react-native';
import React from "react";
import {ShopProductBanner} from "@/components/shopComponents/ShopProductBanner";
import {useTheme} from "@react-navigation/native";

import {Img} from "@/components/elements/Img";

export function ShopProduct(props: any) {
  const {colors} = useTheme();

  const {product, isJamTracks, isAlone, index} = props

  const findImage = () => {
    return product.assets.find((asset: any) => (asset.primaryMode === 'MAX'))
  }

  return (
    <View style={[{
      padding: 5,
      borderRadius: 10,
      overflow: 'hidden',
      margin: 2,
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
    }, product.size === 'Size_1_x_1' ? {width: 108, height: 115} : null
      , product.size === 'Size_1_x_1' && isJamTracks ? {width: 140, height: 140} : null
      , product.size === 'Size_1_x_1' && isAlone ? {width: 110, height: 235} : null
      , product.size === 'Size_1_x_2' ? {width: 110, height: 235} : null
      , product.size === 'Size_3_x_2' ? {width: 245, height: 235} : null
      , product.size === 'Size_2_x_2' ? {width: 250, height: 235} : null
      , product.size === 'Size_5_x_2' ? {width: 330, height: 235} : null
      , product.size === 'Doublewide' ? {
        width: 245,
        height: 220
      } : null
    ]}
          key={index}>
      {/*IMAGE PRODUCT*/}
      <View style={{position: 'absolute', zIndex: 0}}>
        {product.assets ?
          findImage() !== undefined ?
            <View>
              {/*<Text>{product.size}</Text>*/}
              <Img
                source={{uri: findImage().background}}
                style={[
                  product.size === 'Size_1_x_1' ? {
                    width: 115, height: 115,
                  } : null,
                  product.size === 'Size_1_x_1' && isJamTracks ? {
                    width: 140, height: 140,
                  } : null

                  ,
                  product.size === 'Size_1_x_1' && isAlone ? {
                    width: 115,
                    height: 250,
                    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
                    top: "15%",
                  } : null

                  , product.size === 'Size_1_x_2' ? {
                    width: 115,
                    height: 250,
                  } : null
                  , product.size === 'Size_2_x_2' ? {
                    width: 250,
                    height: 250,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_3_x_2' ? {
                    width: 245,
                    height: 250,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_5_x_2' ? {
                    width: 340,
                    height: 320,
                    top: 0,
                    transform: [{scaleX: 1}, {scaleY: 1}, {translateY: 0}],
                  } : null
                  , product.size === 'Doublewide' ? {
                    width: 245,
                    height: 220,
                  } : null
                ]}
              />
            </View>
            : <View>
              <Img
                source={{uri: product.assets[0]?.background}}
                style={[
                  product.size === 'Size_1_x_1' ? {
                    width: 125, height: 115,
                    transform: [{translateX: -15}],

                  } : null,
                  product.size === 'Size_1_x_1' && isJamTracks ? {
                    width: 140, height: 140,
                    transform: [{translateX: 0}],
                  } : null,
                  product.size === 'Size_1_x_1' && isAlone ? {
                    width: 115,
                    height: 250,
                    transform: [{translateX: 0}],
                  } : null
                  , product.size === 'Size_1_x_2' ? {
                    width: 115,
                    height: 250,
                  } : null
                  , product.size === 'Size_2_x_2' ? {
                    width: 250,
                    height: 250,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_3_x_2' ? {
                    width: 245,
                    height: 250,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_5_x_2' ? {
                    width: 290,
                    height: 250,
                    top: 0,
                    transform: [{scaleX: 1.5}, {scaleY: 1.5}, {translateY: 37}],
                  } : null
                  , product.size === 'Doublewide' ? {
                    width: 245,
                    height: 220,
                  } : null
                ]}
              />
            </View>
          : null}
      </View>

      {/*PRODUCT OFFER ALERT*/}
      {product.banner.display ?
        <ShopProductBanner banner={product.banner}></ShopProductBanner>
        : <View></View>}

      {/*PRODUCT INFORMATION*/}
      <View style={{borderRadius: 5, alignSelf: 'flex-start', padding: 5, overflow: 'hidden'}}>
        <View style={[{backgroundColor: colors.background}, styles.productInformationBackground]}></View>
        {/*PRODUCT NAME*/}
        <View>
          <View>
            <Text style={{color: colors.text, letterSpacing: -.8}}>{product.name}</Text>
          </View>
          {product.type && !isJamTracks && product.size !== 'Size_1_x_1'
            ?
            <View>
              <Text style={{color: colors.text, letterSpacing: -.8}}>{product.type}</Text>
            </View>
            : null}
        </View>
        {/*PRODUCT PRICE*/}
        <View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Img source={require('../../assets/images/vbuck/vbuck_80x80.webp')}
                 style={{width: 25, height: 25}}></Img>
            <Text style={{color: colors.text, letterSpacing: -.8}}>{product.finalPrice}</Text>

            {product.finalPrice !== product.regularPrice ?
              <View style={{position: 'relative', opacity: .5}}>
                <Text style={{color: colors.text, letterSpacing: -.8}}>{product.regularPrice}</Text>
                <View style={{
                  backgroundColor: colors.text,
                  width: '110%',
                  height: 2,
                  transform: [{rotate: '-10deg'}],
                  position: 'absolute',
                  top: '30%',
                  left: -2,
                  opacity: .6
                }}></View>
              </View>
              : null
            }
          </View>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({

  productInformationBackground: {
    width: '150%',
    height: '150%',
    position: 'absolute',
    opacity: .3,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
