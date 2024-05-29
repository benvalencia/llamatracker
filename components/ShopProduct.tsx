import {Image, StyleSheet, Text, View} from 'react-native';
import React from "react";

export function ShopProduct(props: any) {

  const {product, index} = props

  return (
    <View style={[{
      padding: 5,
      borderRadius: 10,
      overflow: 'hidden',
      margin: 2,
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
    }, product.tile === 'Size_1_x_1' ? {width: 85, height: 108} : null
      , product.tile === 'Size_1_x_2' ? {width: 110, height: 220} : null
      , product.tile === 'Size_2_x_2' ? {width: 210, height: 220} : null
    ]}
          key={index}>
      {/*IMAGE PRODUCT*/}
      <View style={{position: 'absolute', zIndex: 0}}>
        {product.materialInstances ?
          product.materialInstances[0] ?
            <View>
              <Image source={{uri: product.materialInstances[0].images.Background}}
                     style={[
                       product.tile === 'Size_1_x_1' ? {width: 110, height: 110} : null
                       , product.tile === 'Size_1_x_2' ? {
                         width: 115,
                         height: 210,
                         transform: [{scaleX: 1.3}, {scaleY: 1.3}],
                         top: "15%",
                       } : null
                       , product.tile === 'Size_2_x_2' ? {
                         width: 210,
                         height: 220,
                         transform: [{scaleX: 1}, {scaleY: 1.1}],
                       } : null
                     ]}
              />
            </View>
            : null
          : null}
      </View>
      {/*PRODUCT OFFER ALERT*/}
      <View>
        {product.banner ?
          <View style={{
            backgroundColor: product.banner.intensity == 'Low' ? 'white' : 'yellow',
            padding: 2,
            borderRadius: 25,
            paddingLeft: 10,
            paddingRight: 10,
            alignSelf: 'flex-start'
          }}>
            <Text>{product.banner.value}</Text>
          </View>
          : null}
      </View>
      {/*PRODUCT INFORMATION*/}
      <View style={{}}>
        {/*PRODUCT NAME*/}
        <View>
          <View>
            <Text style={{color: 'white', letterSpacing: -.8}}>{product.name}</Text>
          </View>
          {product.bundle
            ?
            <View>
              <Text style={{color: 'white', letterSpacing: -.8}}>{product.bundle.info}</Text>
            </View>
            : null}
        </View>
        {/*PRODUCT PRICE*/}
        <View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Image source={require('../assets/images/vbuck/vbuck.png')}
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
