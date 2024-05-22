import {Image, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {useNavigation} from "expo-router";
import React, {useEffect, useState} from "react";
import {CommonActions} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShopScreen() {
  const fortniteService = new FortniteService();
  const navigation = useNavigation()
  const {top, bottom} = useSafeAreaInsets()

  const [shopInformation, setShopInformation] = useState({} as any);
  const [shopList, setShopList] = useState([] as any);

  const [shopRaw, setShopRaw] = useState({} as any);
  const [shopCache, setShopCache] = useState({} as any);
  const [refreshing, setRefreshing] = useState(false);

  const goToItemDetail = (item: any) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/shop/itemDetail',
        params: {
          item
        }
      }));
  }

  const getStoreShop = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('daily-shop');
      const objToTransform = jsonValue != null ? JSON.parse(jsonValue) : null;
      setShopCache(jsonValue as any)
      setShopRaw(objToTransform as any)
    } catch (err) {
      // error reading value
      console.log(err)
    }
  }

  const getShopList = async () => {
    let tienda: any = []
    // const getShop = await fortniteService.getBatelRoyaleShop();
    // const getShopCombined = await fortniteService.getBatelRoyaleShopCombined();
    // TODO: validar que la fecha de tienda no sea anterior a hoy
    if (shopCache == null) {
      console.log("setting cache")
      console.log(shopCache)
      const getShopCombined = await fortniteService.getBatelRoyaleShopCombined();

      try {
        const jsonValue = JSON.stringify(getShopCombined);
        await AsyncStorage.setItem('daily-shop', jsonValue);
        setShopCache(getShopCombined as any)
        // console.log("setting cache")
        // console.log("json >>> ", jsonValue)
        // console.log("getShopCombined >>> ", getShopCombined)
      } catch (err) {
        // saving error
        console.log(err)
      }
    }

    setShopInformation({date: shopRaw.data ? shopRaw.data.date : null})

    await shopRaw.data.featured.entries.forEach((entry: any) => {
      let formNewObject = {}

      formNewObject = {
        ...{banner: entry.banner},
        ...{bundle: entry.bundle},
        ...{finalPrice: entry.finalPrice},
        ...{regularPrice: entry.regularPrice},
        ...{layout: entry.layout},
        ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null}
      };

      tienda.push(formNewObject);
    })

    console.log('---------')
    console.log('shopRaw instance >>> ', shopRaw.data.featured.entries[10].newDisplayAsset.materialInstances[0].images.Background)
    console.log('shopRaw instance >>> ', shopRaw.data.featured.entries[10].newDisplayAsset.materialInstances[1].images.Background)
    // console.log('shopRaw instance >>> ', shopRaw.data.featured.entries[10].newDisplayAsset.materialInstances[2].images.Background)
    // console.log('shopRaw instance >>> ', shopRaw.data.featured.entries[10].newDisplayAsset.materialInstances[3].images.Background)

    console.log('shopList instance >>> ', tienda[0].layout)


    // ESTOS ENTRAN EN EL NUEVO ARRAY DE OBJECTOS
    // console.log('producto.banner = descuento >>> ', getShopCombined.data.featured.entries[0].banner) // para pintar el descuento
    // console.log('producto.bundle = paquete - imagen, typo, nombre >>> ', getShopCombined.data.featured.entries[0].bundle) // para pintar un paquete
    // console.log('producto.finalPrice = precio actual >>> ', getShopCombined.data.featured.entries[0].finalPrice) // para pintar el precio
    // console.log('producto.regularPrice = precio original >>> ', getShopCombined.data.featured.entries[0].regularPrice) // para pintar el precio
    // console.log('producto.layout = Informacion para pintar seccion - background, categoria (destacados, originales, etc), id, name >>> ', getShopCombined.data.featured.entries[0].layout) // para pintar en la seccion correspondiente

    // console.log('producto.newDisplayAsset.materialInstances.images.Background = imagen del paquete >>> ', getShopCombined.data.featured.entries[0].newDisplayAsset.materialInstances[0].images.Background) // para pintar la imagen del paquete
    // console.log('producto.items = productos>>> ', getShopCombined.data.featured.entries[0].items[0]) // para pintar un paquete


    // console.log('tienda productos >>> ', tienda[0])
    // console.log('items >>>', getShop.data.featured.entries[1].items)
    //
    // console.log('getShop >>> ', getShop.data)

    setShopList(tienda ? tienda.map((i: any) => i) : null);
    setRefreshing(false);
  };

  // Función de refresh
  const onRefresh = () => {
    setRefreshing(true);
    getShopList().then();
  };

  useEffect(() => {
    getStoreShop().then()
    setTimeout(() => {
      getShopList().then();
    }, 1)
  }, []);


  return (
    <ScrollView
      contentContainerStyle={[styles.container, {paddingTop: top}]}
      refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                        style={styles.scrollReloadContainer}/>}>
      <View style={{
        backgroundColor: Colors.primary,
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View>
          <Text>{new Date(shopInformation.date).toLocaleDateString('spanish', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          })}</Text>
        </View>

        <View style={styles.shopListContainer}>
          <Text>Spotlight - Destacados</Text>

          {shopList ? shopList.map((item: any, index: number) => {
            return (
              <View style={{backgroundColor: 'grey', padding: 10, borderRadius: 5}} key={index}>
                {/*ALERT*/}
                {item.banner ?
                  <View style={{
                    backgroundColor: item.banner.intensity == 'Low' ? 'white' : 'yellow',
                    padding: 2,
                    borderRadius: 25,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignSelf: 'flex-start'
                  }}>
                    <Text>{item.banner.value}</Text>
                  </View>
                  : null}


                {item.bundle ?
                  <View>
                    <Image source={{uri: item.bundle.image}} width={150} height={150}/>
                    <Text>{item.bundle.name}</Text>
                    <Text>{item.bundle.info}</Text>
                  </View>
                  : null}

                {item.layout ?
                  <View>
                    <Image source={{uri: item.layout.background}} width={150} height={150}/>
                    {/*<Text>{item.layout.background}</Text>*/}
                    <Text>{item.layout.category}</Text>
                    <Text>{item.layout.id}</Text>
                    <Text>{item.layout.name}</Text>
                    <Text>{item.layout.showIneligibleOffers}</Text>
                  </View>
                  : null}

                {item.materialInstances ?
                  item.materialInstances[0] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[0].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[1] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[1].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[2] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[2].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[3] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[3].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[4] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[4].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[5] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[5].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[6] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[6].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[7] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[7].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[8] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[8].images.Background}</Text>
                    </View>
                    : null
                  : null}

                {item.materialInstances ?
                  item.materialInstances[9] ?
                    <View>
                      {/*<Image source={{uri: item.layout.background}} width={150} height={150}/>*/}
                      <Text>{item.materialInstances[9].images.Background}</Text>
                    </View>
                    : null
                  : null}


                {/*PRICE*/}
                <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Image source={require('../../../assets/images/vbuck/vbuck.png')}
                         style={{width: 25, height: 25}}></Image>
                  <Text style={{color: 'white'}}>{item.finalPrice}</Text>
                  <Text style={{color: 'white', opacity: .5}}>{item.regularPrice}</Text>
                </View>

              </View>
            )
          }) : <Text>test</Text>}


          {/*      <Pressable style={styles.itemContainer} key={index} onPress={() => goToItemDetail(item)}>*/}
          {/*        <Text>categories: {item.layout.category}</Text>*/}

          {/*        /!*<Text>section: {item.section}</Text>*!/*/}

          {/*        /!*<Text>devName: {item.devName}</Text>*!/*/}
          {/*        /!*<Text>displayAssetPath: {item.displayAssetPath}</Text>*!/*/}
          {/*        /!*<Text>giftable: {item.giftable ? 'true' : 'false'}</Text>*!/*/}
          {/*        /!*<Text>newDisplayAssetPath: {item.newDisplayAssetPath}</Text>*!/*/}
          {/*        /!*<Text>offerId: {item.offerId}</Text>*!/*/}
          {/*        /!*<Text>refundable: {item.refundable ? 'true' : 'false'}</Text>*!/*/}
          {/*        /!*<Text>sectionId: {item.sectionId}</Text>*!/*/}
          {/*        /!*<Text>sortPriority: {item.sortPriority}</Text>*!/*/}
          {/*        /!*<Text>tileSize: {item.tileSize}</Text>*!/*/}

          {/*        /!*banner INFORMATION*!/*/}
          {/*        /!*<Text>banner.backendValue: {item.banner?.backendValue}</Text>*!/*/}
          {/*        /!*<Text>banner.intensity: {item.banner?.intensity}</Text>*!/*/}
          {/*        /!*<Text>banner.value: {item.banner?.value}</Text>*!/*/}

          {/*        /!*NewDisplayAsset INFORMATION*!/*/}
          {/*        /!*<Text>newDisplayAsset.id: {item.newDisplayAsset?.id}</Text>*!/*/}


          {/*        /!*LAYOUT INFORMATION*!/*/}
          {/*        /!*<Text>layout.background: {item.layout?.background}</Text>*!/*/}
          {/*        /!*<Image source={{uri: item.layout?.background}} style={{*!/*/}
          {/*        /!*  height: 150,*!/*/}
          {/*        /!*  objectFit: 'contain'*!/*/}
          {/*        /!*}}></Image>*!/*/}
          {/*        /!*<Text>layout.category: {item.layout?.category}</Text>*!/*/}
          {/*        /!*<Text>layout.id: {item.layout?.id}</Text>*!/*/}
          {/*        /!*<Text>layout.index: {item.layout?.index}</Text>*!/*/}
          {/*        /!*<Text>layout.name: {item.layout?.name}</Text>*!/*/}
          {/*        /!*<Text>layout.showIneligibleOffers: {item.layout?.showIneligibleOffers}</Text>*!/*/}

          {/*        /!*BUNDLE INFORMATION*!/*/}
          {/*        /!*{item.bundle?.info === 'Bundle' ?*!/*/}
          {/*        /!*  <View>*!/*/}
          {/*        /!*    <View>*!/*/}
          {/*        /!*      /!*<Text>bundle.image: {item.bundle?.image}</Text>*!/*!/*/}
          {/*        /!*      <Image source={{uri: item.bundle?.image}} style={{*!/*/}
          {/*        /!*        width: 150,*!/*/}
          {/*        /!*        height: 150,*!/*/}
          {/*        /!*        zIndex: 1,*!/*/}
          {/*        /!*        objectFit: 'contain',*!/*/}
          {/*        /!*        position: 'absolute',*!/*/}
          {/*        /!*        alignSelf: 'center',*!/*/}
          {/*        /!*      }}/>*!/*/}
          {/*        /!*      <Image source={{uri: item.layout?.background}} style={{*!/*/}
          {/*        /!*        height: 150,*!/*/}
          {/*        /!*      }}></Image>*!/*/}
          {/*        /!*    </View>*!/*/}
          {/*        /!*    /!*<Text>bundle.info: {item.bundle?.info}</Text>*!/*!/*/}
          {/*        /!*    <Text>bundle.name: {item.bundle?.name}</Text>*!/*/}
          {/*        /!*  </View> : null*!/*/}
          {/*        /!*}*!/*/}

          {/*      </Pressable>*/}

          {/*    // <Pressable style={styles.itemContainer} key={index} onPress={() => goToItemDetail(item)}>*/}
          {/*    //     <Text>categories: {item.categories}</Text>*/}
          {/*    //     <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>*/}
          {/*    //       <Image source={{uri: shopList.vbuckIcon}} width={25} height={25}></Image>*/}
          {/*    //       <Text>{item.finalPrice}</Text>*/}
          {/*    //       <Text style={{color: 'red'}}>{item.regularPrice}</Text>*/}
          {/*    //     </View>*/}
          {/*    //*/}
          {/*    //     <Text>section: {item.section}</Text>*/}
          {/*    //*/}
          {/*    //     /!*<Text>devName: {item.devName}</Text>*!/*/}
          {/*    //     /!*<Text>displayAssetPath: {item.displayAssetPath}</Text>*!/*/}
          {/*    //     /!*<Text>giftable: {item.giftable ? 'true' : 'false'}</Text>*!/*/}
          {/*    //     /!*<Text>newDisplayAssetPath: {item.newDisplayAssetPath}</Text>*!/*/}
          {/*    //     /!*<Text>offerId: {item.offerId}</Text>*!/*/}
          {/*    //     /!*<Text>refundable: {item.refundable ? 'true' : 'false'}</Text>*!/*/}
          {/*    //     /!*<Text>sectionId: {item.sectionId}</Text>*!/*/}
          {/*    //     /!*<Text>sortPriority: {item.sortPriority}</Text>*!/*/}
          {/*    //     /!*<Text>tileSize: {item.tileSize}</Text>*!/*/}
          {/*    //*/}
          {/*    //     /!*banner INFORMATION*!/*/}
          {/*    //     /!*<Text>banner.backendValue: {item.banner?.backendValue}</Text>*!/*/}
          {/*    //     /!*<Text>banner.intensity: {item.banner?.intensity}</Text>*!/*/}
          {/*    //     /!*<Text>banner.value: {item.banner?.value}</Text>*!/*/}
          {/*    //*/}
          {/*    //     /!*NewDisplayAsset INFORMATION*!/*/}
          {/*    //     /!*<Text>newDisplayAsset.id: {item.newDisplayAsset?.id}</Text>*!/*/}
          {/*    //*/}
          {/*    //*/}
          {/*    //     /!*LAYOUT INFORMATION*!/*/}
          {/*    //     /!*<Text>layout.background: {item.layout?.background}</Text>*!/*/}
          {/*    //     /!*<Image source={{uri: item.layout?.background}} style={{*!/*/}
          {/*    //     /!*  height: 150,*!/*/}
          {/*    //     /!*  objectFit: 'contain'*!/*/}
          {/*    //     /!*}}></Image>*!/*/}
          {/*    //     /!*<Text>layout.category: {item.layout?.category}</Text>*!/*/}
          {/*    //     /!*<Text>layout.id: {item.layout?.id}</Text>*!/*/}
          {/*    //     /!*<Text>layout.index: {item.layout?.index}</Text>*!/*/}
          {/*    //     <Text>layout.name: {item.layout?.name}</Text>*/}
          {/*    //     <Text>layout.showIneligibleOffers: {item.layout?.showIneligibleOffers}</Text>*/}
          {/*    //*/}
          {/*    //     /!*BUNDLE INFORMATION*!/*/}
          {/*    //     {item.bundle?.info === 'Bundle' ?*/}
          {/*    //       <View>*/}
          {/*    //         <View>*/}
          {/*    //           /!*<Text>bundle.image: {item.bundle?.image}</Text>*!/*/}
          {/*    //           <Image source={{uri: item.bundle?.image}} style={{*/}
          {/*    //             width: 150,*/}
          {/*    //             height: 150,*/}
          {/*    //             zIndex: 1,*/}
          {/*    //             objectFit: 'contain',*/}
          {/*    //             position: 'absolute',*/}
          {/*    //             alignSelf: 'center',*/}
          {/*    //           }}/>*/}
          {/*    //           <Image source={{uri: item.layout?.background}} style={{*/}
          {/*    //             height: 150,*/}
          {/*    //           }}></Image>*/}
          {/*    //         </View>*/}
          {/*    //         /!*<Text>bundle.info: {item.bundle?.info}</Text>*!/*/}
          {/*    //         <Text>bundle.name: {item.bundle?.name}</Text>*/}
          {/*    //       </View> : null*/}
          {/*    //     }*/}
          {/*    //*/}
          {/*    //   </Pressable>*/}
          {/*    )*/}
          {/*  })}*/}
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  scrollReloadContainer: {
    backgroundColor: Colors.primary,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // SHOP LIST CONTAINER
  shopListContainer: {
    backgroundColor: 'red',
    gap: 5,
  },
  // NEWS ITEMS CONTAINER
  itemContainer: {
    backgroundColor: 'blue',
  },

});
