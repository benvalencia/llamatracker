import {Image, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {ShopProductBanner} from "@/components/shopComponents/ShopProductBanner";

export function ShopProduct(props: any) {

  const {product, index} = props

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
    }, product.size === 'Size_1_x_1' ? {width: 85, height: 108} : null
      , product.size === 'Size_1_x_2' ? {width: 110, height: 220} : null
      , product.size === 'Size_3_x_2' ? {width: 245, height: 220} : null
      , product.size === 'Size_2_x_2' ? {width: 210, height: 220} : null
      , product.size === 'Size_5_x_2' ? {width: 290, height: 220} : null
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
              <Image
                source={{uri: findImage().background}}
                style={[
                  product.size === 'Size_1_x_1' ? {
                    width: 110, height: 110,
                    transform: [{translateX: -15}],

                  } : null
                  , product.size === 'Size_1_x_2' ? {
                    width: 115,
                    height: 210,
                    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
                    top: "15%",
                  } : null
                  , product.size === 'Size_2_x_2' ? {
                    width: 210,
                    height: 220,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_3_x_2' ? {
                    width: 245,
                    height: 220,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_5_x_2' ? {
                    width: 290,
                    height: 220,
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
            : <View>
              <Image
                source={{uri: product.assets[0].background}}
                style={[
                  product.size === 'Size_1_x_1' ? {
                    width: 110, height: 110,
                    transform: [{translateX: -15}],

                  } : null
                  , product.size === 'Size_1_x_2' ? {
                    width: 115,
                    height: 210,
                    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
                    top: "15%",
                  } : null
                  , product.size === 'Size_2_x_2' ? {
                    width: 210,
                    height: 220,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_3_x_2' ? {
                    width: 245,
                    height: 220,
                    transform: [{scaleX: 1}, {scaleY: 1.1}],
                  } : null
                  , product.size === 'Size_5_x_2' ? {
                    width: 290,
                    height: 220,
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
      <View style={{}}>
        {/*PRODUCT NAME*/}
        <View>
          <View>
            <Text style={{color: 'white', letterSpacing: -.8}}>{product.name}</Text>
          </View>
          {product.type
            ?
            <View>
              <Text style={{color: 'white', letterSpacing: -.8}}>{product.type}</Text>
            </View>
            : null}
        </View>
        {/*PRODUCT PRICE*/}
        <View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Image source={require('../../assets/images/vbuck/vbuck.png')}
                   style={{width: 25, height: 25}}></Image>
            <Text style={{color: 'white', letterSpacing: -.8}}>{product.finalPrice}</Text>

            {product.finalPrice !== product.regularPrice ?
              <View style={{position: 'relative', opacity: .5}}>
                <Text style={{color: 'white', letterSpacing: -.8}}>{product.regularPrice}</Text>
                <View style={{
                  backgroundColor: 'white',
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
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
