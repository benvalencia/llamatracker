import {ScrollView, Text, View} from 'react-native';
import React from "react";
import {ShopProductImage} from "@/components/shopComponents/ShopProductImage";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ShopProductBanner} from "@/components/shopComponents/ShopProductBanner";
import {useTheme} from "@react-navigation/native";
import {Img} from "@/components/elements/Img";
import {FlashList} from "@shopify/flash-list";
import {Fonts} from "@/constants/Colors";

export default function ItemDetailScreen({route}: any) {
  const {colors} = useTheme();
  const {bottom} = useSafeAreaInsets()

  const {product} = route.params;

  const daysLeft = Math.trunc(((Number(new Date(product.out)) - Number(new Date())) / 86400000));

  return (
    <View style={{
      height: '100%',
      width: '100%',
    }}>
      <View style={{width: '100%', height: 270, overflow: 'hidden'}}>
        {/*PRODUCT IMAGE*/}
        <ShopProductImage assets={product.assets} size={product.size}></ShopProductImage>
        {/*PRODUCT BANNER*/}
        {product.banner.display
          ? <View style={{position: 'absolute', padding: 5, bottom: 0}}>
            <ShopProductBanner banner={product.banner}></ShopProductBanner>
          </View>
          : null}
      </View>

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {/*PRODUCT NAME*/}
          <Text style={{
            fontSize: Fonts.size.l,
            color: colors.text,
            width: '100%',
            padding: 5
          }}>{product.name}</Text>
          {/*PRODUCT INFO*/}
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            {/*PRODUCT DETAILS*/}
            <View style={{maxWidth: 245, padding: 5, gap: 10}}>
              <View style={{gap: 5}}>
                {/*PRODUCT RARITY & TYPE*/}
                <Text style={{
                  fontSize: Fonts.size.m,
                  color: colors.text
                }}>{product.rarity.name} {product.type}</Text>
                {/*PRODUCT SERIES & TYPE*/}
                {product.series
                  ? <Text style={{
                    fontSize: Fonts.size.m,
                    color: colors.text
                  }}>{product.series.name}</Text> : null}
                {/*PRODUCT RELEASED*/}
                <Text style={{
                  fontSize: Fonts.size.m,
                  color: colors.text
                }}>Lanzado
                  el {new Date(product.in).toLocaleDateString()}</Text>
                {/*PRODUCT DAYS LEFT*/}
                <Text style={{
                  fontSize: Fonts.size.m,
                  color: colors.text
                }}>Se
                  va {daysLeft ? 'en ' + daysLeft + (daysLeft > 1 ? ' días' : ' día') : 'hoy'}</Text>
              </View>
            </View>
            {/*PRODUCT PRICE*/}
            <View style={{maxWidth: 145, padding: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Img source={require('../../../assets/images/vbuck/vbuck_80x80.webp')}
                     style={{width: 20, height: 20}}></Img>
                <Text style={{
                  color: colors.text,
                  letterSpacing: Fonts.spacing.hard,
                  fontSize: Fonts.size.m,
                }}>{product.finalPrice}</Text>

                {product.finalPrice !== product.regularPrice ?
                  <View style={{position: 'relative', opacity: .5}}>
                    <Text style={{
                      color: colors.text,
                      letterSpacing: Fonts.spacing.hard,
                      fontSize: Fonts.size.m,
                    }}>{product.regularPrice}</Text>
                    <View style={{
                      backgroundColor: colors.text,
                      width: '120%',
                      height: 2,
                      transform: [{rotate: '-9deg'}],
                      position: 'absolute',
                      top: '45%',
                      left: -3,
                      opacity: .6
                    }}></View>
                  </View>
                  : null
                }
              </View>
            </View>
          </View>
          {/*PRODUCT DESCRIPTION*/}
          {product.description
            ? <View style={{
              padding: 10,
              margin: 10,
              borderRadius: 10,
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: colors.text
            }}>
              <Text style={{
                fontSize: Fonts.size.m,
                color: colors.text,
                textAlign: 'center'
              }}>{product.description}</Text>
            </View>
            : null}
        </View>

        <View style={{padding: 5, gap: 5, paddingBottom: bottom}}>
          <Text style={{
            fontSize: Fonts.size.l,
            color: colors.text
          }}>Incluye:</Text>
          <View style={{gap: 5}}>
            <FlashList
              renderItem={({item}: any) => {

                return (<View style={{
                    backgroundColor: 'grey',
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 10,
                    overflow: 'hidden',
                    height: 130,
                    margin: 10,
                  }}>
                    <View>
                      <Img source={{uri: item.images.background}}
                           style={{width: 130, height: 130}}></Img>

                    </View>
                    <View style={{padding: 5, gap: 2, alignSelf: 'center'}}>
                      <Text style={{fontSize: Fonts.size.s}}>{item.name}</Text>

                      <Text style={{fontSize: Fonts.size.s}}>{item.rarity.name} {item.type.name}</Text>
                      <Text style={{fontSize: Fonts.size.s}}>{item.series ? item.series.name : 'no series'}</Text>

                      <Text style={{fontSize: Fonts.size.s}}>{item.set ? item.set.partOf : 'no part of'}</Text>

                      {item.description
                        ? <View style={{
                          padding: 5,
                          borderRadius: 10,
                          borderStyle: 'dashed',
                          borderWidth: 1,
                          borderColor: colors.text,
                          justifyContent: 'flex-start'
                        }}>
                          <Text style={{
                            fontSize: Fonts.size.s,
                            color: colors.text,
                            textAlign: 'center',
                            maxWidth: 200
                          }}>{item.description}</Text>
                        </View>
                        : null}
                    </View>
                  </View>
                );
              }}
              estimatedItemSize={10}
              data={product.items}
              collapsable={true}
              horizontal={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
