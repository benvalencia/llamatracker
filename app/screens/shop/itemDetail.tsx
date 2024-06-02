import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React from "react";
import {ShopProductImage} from "@/components/shopComponents/ShopProductImage";

export default function ItemDetailScreen({route}: any) {
  const {product} = route.params;

  // console.log('items.description >>> ', shopRaw.data.featured.entries[10].items[0].description)
  // console.log('items.images.icon >>> ', shopRaw.data.featured.entries[10].items[0].images.icon)
  // console.log('items.images.lego.small >>> ', shopRaw.data.featured.entries[10].items[0].images.lego.small)
  // console.log('items.images.lego.wide >>> ', shopRaw.data.featured.entries[10].items[0].images.lego.wide)

  // console.log('items.images.other >>> ', shopRaw.data.featured.entries[10].items[0].images.other)
  // console.log('items.images.smallIcon >>> ', shopRaw.data.featured.entries[10].items[0].images.smallIcon)
  // console.log('items.introduction.chapter >>> ', shopRaw.data.featured.entries[10].items[0].introduction.chapter)
  // console.log('items.introduction.season >>> ', shopRaw.data.featured.entries[10].items[0].introduction.season)
  // console.log('items.introduction.text >>> ', shopRaw.data.featured.entries[10].items[0].introduction.text)
  // console.log('items.metaTags >>> ', shopRaw.data.featured.entries[10].items[0].metaTags)
  // console.log('items.name >>> ', shopRaw.data.featured.entries[10].items[0].name)
  // console.log('items.rarity.value >>> ', shopRaw.data.featured.entries[10].items[0].rarity.value)
  // console.log('items.rarity.displayValue >>> ', shopRaw.data.featured.entries[10].items[0].rarity.displayValue)
  //
  // console.log('items.set.text >>> ', shopRaw.data.featured.entries[10].items[0].set.text)
  // console.log('items.other >>> ', shopRaw.data.featured.entries[10].items[0].set.value)
  // console.log('items.shopHistory >>> ', shopRaw.data.featured.entries[10].items[0].shopHistory)
  //
  // console.log('items.type.displayValue >>> ', shopRaw.data.featured.entries[10].items[0].type.displayValue)
  // console.log('items.type.value >>> ', shopRaw.data.featured.entries[10].items[0].type.value)
  //
  // console.log('items.variants >>> ', shopRaw.data.featured.entries[10].items[0].variants)

  // console.log('producto.newDisplayAsset.materialInstances.images.Background = imagen del paquete >>> ', getShopCombined.data.featured.entries[0].newDisplayAsset.materialInstances[0].images.Background) // para pintar la imagen del paquete

// ...{banner: entry.banner},
// ...{bundle: entry.bundle},
// ...{showIneligibleOffers: entry.layout ? entry.layout.showIneligibleOffers : null},
// ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},
// ...{image: entry.items[0].images ? entry.items[0].images.featured : null},

  console.log(product.items);

  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      width: '100%',
    }}>
      <View style={{width: '100%', height: 290, overflow: 'hidden'}}>
        {/*<View style={{width: '100%', height: 380, overflow: 'hidden'}}>*/}
        {
          <ShopProductImage assets={product.materialInstances} size={product.title}></ShopProductImage>
        }
      </View>
      <ScrollView>
        {/*PRODUCT NAME*/}
        <Text style={{fontSize: 23}}>{product.name}</Text>
        {/*PRODUCT PRICE*/}
        <View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Image source={require('../../../assets/images/vbuck/vbuck.png')}
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

        {/*PRODUCT BANNER*/}
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

        <Text>bundle.info: {product.bundle ? product.bundle.info : null}</Text>

        {product.items.map((item: any, index: number) => {
          return (
            <View key={index}>
              <Text>///////////</Text>
              <Text>{index}</Text>
              <Text>name: {item.name}</Text>
              <Text>description: {item.description}</Text>
              <Text>added: {item.added}</Text>
              <Text>rarity.value: {item.rarity.value}</Text>
              <Text>rarity.displayValue: {item.rarity.displayValue}</Text>
              <Text>set.value: {item.set.value}</Text>
              <Text>set.text: {item.set.text}</Text>
              <Text>showcaseVideo: {item.showcaseVideo}</Text>
              <Text>type.value: {item.type.value}</Text>
              <Text>type.displayValue: {item.type.displayValue}</Text>
              <Text>introduction.text: {item.introduction.text}</Text>
              <Text>introduction.chapter: {item.introduction.chapter}</Text>
              <Text>introduction.season: {item.introduction.season}</Text>


              <Text>images.featured: {item.images.featured}</Text>
              <Text>images.icon: {item.images.icon}</Text>
              <Text>images.smallIcon: {item.images.smallIcon}</Text>

              <Text>images.lego: {item.images.lego ? item.images.lego.length : null}</Text>
              <Text>shopHistory Array count: {item.shopHistory ? item.shopHistory.length : null}</Text>
              <Text>variants Array count: {item.variants ? item.variants.length : null}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
