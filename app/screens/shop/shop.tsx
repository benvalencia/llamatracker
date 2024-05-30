import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {useNavigation} from "expo-router";
import React, {useEffect, useState} from "react";
import {CommonActions} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ShopProduct} from "@/components/ShopProduct";

export default function ShopScreen() {
  const fortniteService = new FortniteService();
  const navigation = useNavigation()
  const {top, bottom} = useSafeAreaInsets()

  const [shopInformation, setShopInformation] = useState({} as any);
  const [shopList, setShopList] = useState([] as any);

  const [shopRaw, setShopRaw] = useState({} as any);
  const [shopCache, setShopCache] = useState(null);
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
      if (objToTransform.data.date
        && new Date(objToTransform.data.date).toDateString() !== new Date().toDateString()) {

        const getShopCombined = await fortniteService.getBatelRoyaleShopCombined();

        const jsonValue = JSON.stringify(getShopCombined);
        await AsyncStorage.setItem('daily-shop', jsonValue);

        setShopCache(jsonValue as any)
        setShopRaw(getShopCombined)
      } else {
        setShopCache(jsonValue as any)
        setShopRaw(objToTransform as any)
      }
    } catch (err) {
      // error reading value
      console.log(err)
    }
  }

  const getShopList = async () => {
    let tienda: any = []

    // const getShop = await fortniteService.getBatelRoyaleShop();
    // const getShopCombined = await fortniteService.getBatelRoyaleShopCombined();

    if (shopCache == null) {
      const getShopCombined = await fortniteService.getBatelRoyaleShopCombined();

      try {
        const jsonValue = JSON.stringify(getShopCombined);
        await AsyncStorage.setItem('daily-shop', jsonValue);
        setShopCache(getShopCombined as any)
        setShopRaw(getShopCombined as any)
      } catch (err) {
        // saving error
        console.log(err)
      }
    }

    setShopInformation({date: shopRaw.data ? shopRaw.data.date : null})

    let shopListArrayBuilder: any = []
    await shopRaw.data?.featured.entries.forEach((entry: any) => {
      let moduleObject: any = {}
      let sectionObject: any = {}
      let productObject = {}

      productObject = {
        ...{banner: entry.banner},
        ...{bundle: entry.bundle},
        ...{tile: entry.tileSize},
        ...{finalPrice: entry.finalPrice},
        ...{regularPrice: entry.regularPrice},
        ...{name: entry.bundle ? entry.bundle.name : entry.layout ? entry.layout.name : 'unnamed'},
        ...{showIneligibleOffers: entry.layout ? entry.layout.showIneligibleOffers : null},
        ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},

        // ...{items: entry.items ? entry.items : null}
      };

      sectionObject = {
        ...{id: entry.layout ? entry.layout.id : null},
        ...{index: entry.layout ? entry.layout.index : null},
        ...{name: entry.layout ? entry.layout.name : null},
        ...{showIneligibleOffers: entry.layout ? entry.layout.showIneligibleOffers : null},
        ...{products: [productObject]},
      };

      moduleObject = {
        ...{category: entry.layout ? entry.layout.category : 'Uncategorized'},
        ...{background: entry.layout ? entry.layout.background ? entry.layout.background : 'default' : 'default'},
        ...{sections: [sectionObject]},
      };


      const module = shopListArrayBuilder.find((element: any) => element.category === entry.layout.category);
      if (module) {

        const section = module.sections.find((element: any) => element.id === entry.layout.id);
        // const section = module.sections.find((element: any) => element.id === entry.sectionId);
        if (section) {
          section.products.push(productObject)
        } else {
          module.sections.push(sectionObject);
        }
      } else {
        shopListArrayBuilder.push(moduleObject);
      }
    });

    setShopList(shopListArrayBuilder ? shopListArrayBuilder.map((i: any) => i) : null);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getShopList().then();
  };

  useEffect(() => {
    getStoreShop().then();
    getShopList().then();
  }, [shopCache]);

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
        justifyContent: 'center',
        width: '100%'
      }}>
        {shopList[0] ?
          <View style={{marginBottom: 15, paddingTop: top}}>
          <Text style={{
            color: 'white',
            fontSize: 23,
            fontWeight: '400'
          }}>{new Date(shopInformation.date).toLocaleDateString('spanish', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          })}</Text>
        </View>
          : null
        }

        <View style={styles.shopListContainer}>
          <View style={{width: 'auto'}}>
            {shopList[0] == undefined ?
              <View style={{
                backgroundColor: Colors.primary,
                height: '100%',
                width: '100%',
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 30,
                  fontWeight: '400',
                  margin: 'auto'
                }}>Loading...</Text>
              </View>
              : null}

            {/*MODULO 0*/}
            {shopList[0] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '500',
                    paddingLeft: 5
                  }}>{shopList[0].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {/*{shopList[0].background !== 'default' ?*/}
                {/*  <View>*/}
                {/*    <Image source={{uri: shopList[0].background}} width={240} height={230}/>*/}
                {/*  </View>*/}
                {/*  : null}*/}

                {/*SECCION 0*/}
                <View>
                  {shopList[0].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[0].name}
                          {/*- {shopList[0].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[0] ?
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
                        {shopList[0].sections[0] && shopList[0].sections[0].products ?
                          shopList[0].sections[0].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 1*/}
                <View>
                  {shopList[0].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[1].name}
                          {/*- {shopList[0].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[1] ?
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
                        {shopList[0].sections[1] && shopList[0].sections[1].products ?
                          shopList[0].sections[1].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 2*/}
                <View>
                  {shopList[0].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[2].name}
                          {/*- {shopList[0].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[2] ?
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
                        {shopList[0].sections[2] && shopList[0].sections[2].products ?
                          shopList[0].sections[2].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 3*/}
                <View>
                  {shopList[0].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[3].name}
                          {/*- {shopList[0].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[3] ?
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
                        {shopList[0].sections[3] && shopList[0].sections[3].products ?
                          shopList[0].sections[3].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 4*/}
                <View>
                  {shopList[0].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[4].name}
                          {/*- {shopList[0].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[4] ?
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
                        {shopList[0].sections[4] && shopList[0].sections[4].products ?
                          shopList[0].sections[4].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 5*/}
                <View>
                  {shopList[0].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[5].name}
                          {/*- {shopList[0].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[5] ?
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
                        {shopList[0].sections[5] && shopList[0].sections[5].products ?
                          shopList[0].sections[5].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 6*/}
                <View>
                  {shopList[0].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[6].name}
                          {/*- {shopList[0].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[6] ?
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
                        {shopList[0].sections[6] && shopList[0].sections[6].products ?
                          shopList[0].sections[6].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 7*/}
                <View>
                  {shopList[0].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[7].name}
                          {/*- {shopList[0].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[7] ?
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
                        {shopList[0].sections[7] && shopList[0].sections[7].products ?
                          shopList[0].sections[7].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 8*/}
                <View>
                  {shopList[0].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[8].name}
                          {/*- {shopList[0].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[8] ?
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
                        {shopList[0].sections[8] && shopList[0].sections[8].products ?
                          shopList[0].sections[8].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 9*/}
                <View>
                  {/*TITULO DE LA SECCION*/}
                  {shopList[0].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[9].name}
                          {/*- {shopList[0].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[0].sections[9] ?
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
                        {shopList[0].sections[9] && shopList[0].sections[9].products ?
                          shopList[0].sections[9].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
              </View>
              : null}


            {/*MODULO 1*/}
            {shopList[1] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '500',
                    paddingLeft: 5
                  }}>{shopList[1].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {/*{shopList[1].background !== 'default' ?*/}
                {/*  <View>*/}
                {/*    <Image source={{uri: shopList[1].background}} width={240} height={230}/>*/}
                {/*  </View>*/}
                {/*  : null}*/}

                {/*SECCION 0*/}
                <View>
                  {shopList[1].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[0].name}
                          {/*- {shopList[1].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[0] ?
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
                        {shopList[1].sections[0] && shopList[1].sections[0].products ?
                          shopList[1].sections[0].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 1*/}
                <View>
                  {shopList[1].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[1].name}
                          {/*- {shopList[1].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[1] ?
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
                        {shopList[1].sections[1] && shopList[1].sections[1].products ?
                          shopList[1].sections[1].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 2*/}
                <View>
                  {shopList[1].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[2].name}
                          {/*- {shopList[1].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[2] ?
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
                        {shopList[1].sections[2] && shopList[1].sections[2].products ?
                          shopList[1].sections[2].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 3*/}
                <View>
                  {shopList[1].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[3].name}
                          {/*- {shopList[1].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[3] ?
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
                        {shopList[1].sections[3] && shopList[1].sections[3].products ?
                          shopList[1].sections[3].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 4*/}
                <View>
                  {shopList[1].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[4].name}
                          {/*- {shopList[1].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[4] ?
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
                        {shopList[1].sections[4] && shopList[1].sections[4].products ?
                          shopList[1].sections[4].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 5*/}
                <View>
                  {shopList[1].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[5].name}
                          {/*- {shopList[1].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[5] ?
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
                        {shopList[1].sections[5] && shopList[1].sections[5].products ?
                          shopList[1].sections[5].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 6*/}
                <View>
                  {shopList[1].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[6].name}
                          {/*- {shopList[1].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[6] ?
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
                        {shopList[1].sections[6] && shopList[1].sections[6].products ?
                          shopList[1].sections[6].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 7*/}
                <View>
                  {shopList[1].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[7].name}
                          {/*- {shopList[1].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[7] ?
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
                        {shopList[1].sections[7] && shopList[1].sections[7].products ?
                          shopList[1].sections[7].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 8*/}
                <View>
                  {shopList[1].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[8].name}
                          {/*- {shopList[1].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[8] ?
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
                        {shopList[1].sections[8] && shopList[1].sections[8].products ?
                          shopList[1].sections[8].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 9*/}
                <View>
                  {/*TITULO DE LA SECCION*/}
                  {shopList[1].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[1].sections[9].name}
                          {/*- {shopList[1].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[1].sections[9] ?
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
                        {shopList[1].sections[9] && shopList[1].sections[9].products ?
                          shopList[1].sections[9].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
              </View>
              : null}

            {/*MODULO 2*/}
            {shopList[2] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '500',
                    paddingLeft: 5
                  }}>{shopList[2].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {/*{shopList[2].background !== 'default' ?*/}
                {/*  <View>*/}
                {/*    <Image source={{uri: shopList[2].background}} width={240} height={230}/>*/}
                {/*  </View>*/}
                {/*  : null}*/}

                {/*SECCION 0*/}
                <View>
                  {shopList[2].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[0].name}
                          {/*- {shopList[2].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[0] ?
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
                        {shopList[2].sections[0] && shopList[2].sections[0].products ?
                          shopList[2].sections[0].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 1*/}
                <View>
                  {shopList[2].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[1].name}
                          {/*- {shopList[2].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[1] ?
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
                        {shopList[2].sections[1] && shopList[2].sections[1].products ?
                          shopList[2].sections[1].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 2*/}
                <View>
                  {shopList[2].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[2].name}
                          {/*- {shopList[2].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[2] ?
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
                        {shopList[2].sections[2] && shopList[2].sections[2].products ?
                          shopList[2].sections[2].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 3*/}
                <View>
                  {shopList[2].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[3].name}
                          {/*- {shopList[2].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[3] ?
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
                        {shopList[2].sections[3] && shopList[2].sections[3].products ?
                          shopList[2].sections[3].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 4*/}
                <View>
                  {shopList[2].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[4].name}
                          {/*- {shopList[2].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[4] ?
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
                        {shopList[2].sections[4] && shopList[2].sections[4].products ?
                          shopList[2].sections[4].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 5*/}
                <View>
                  {shopList[2].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[5].name}
                          {/*- {shopList[2].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[5] ?
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
                        {shopList[2].sections[5] && shopList[2].sections[5].products ?
                          shopList[2].sections[5].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 6*/}
                <View>
                  {shopList[2].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[6].name}
                          {/*- {shopList[2].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[6] ?
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
                        {shopList[2].sections[6] && shopList[2].sections[6].products ?
                          shopList[2].sections[6].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 7*/}
                <View>
                  {shopList[2].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[7].name}
                          {/*- {shopList[2].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[7] ?
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
                        {shopList[2].sections[7] && shopList[2].sections[7].products ?
                          shopList[2].sections[7].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 8*/}
                <View>
                  {shopList[2].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[8].name}
                          {/*- {shopList[2].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[8] ?
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
                        {shopList[2].sections[8] && shopList[2].sections[8].products ?
                          shopList[2].sections[8].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 9*/}
                <View>
                  {/*TITULO DE LA SECCION*/}
                  {shopList[2].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[2].sections[9].name}
                          {/*- {shopList[2].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[2].sections[9] ?
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
                        {shopList[2].sections[9] && shopList[2].sections[9].products ?
                          shopList[2].sections[9].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
              </View>
              : null}

            {/*MODULO 3*/}
            {shopList[3] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '500',
                    paddingLeft: 5
                  }}>{shopList[3].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {/*{shopList[3].background !== 'default' ?*/}
                {/*  <View>*/}
                {/*    <Image source={{uri: shopList[3].background}} width={240} height={230}/>*/}
                {/*  </View>*/}
                {/*  : null}*/}

                {/*SECCION 0*/}
                <View>
                  {shopList[3].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[0].name}
                          {/*- {shopList[3].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[0] ?
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
                        {shopList[3].sections[0] && shopList[3].sections[0].products ?
                          shopList[3].sections[0].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 1*/}
                <View>
                  {shopList[3].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[1].name}
                          {/*- {shopList[3].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[1] ?
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
                        {shopList[3].sections[1] && shopList[3].sections[1].products ?
                          shopList[3].sections[1].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 2*/}
                <View>
                  {shopList[3].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[2].name}
                          {/*- {shopList[3].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[2] ?
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
                        {shopList[3].sections[2] && shopList[3].sections[2].products ?
                          shopList[3].sections[2].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 3*/}
                <View>
                  {shopList[3].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[3].name}
                          {/*- {shopList[3].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[3] ?
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
                        {shopList[3].sections[3] && shopList[3].sections[3].products ?
                          shopList[3].sections[3].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 4*/}
                <View>
                  {shopList[3].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[4].name}
                          {/*- {shopList[3].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[4] ?
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
                        {shopList[3].sections[4] && shopList[3].sections[4].products ?
                          shopList[3].sections[4].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 5*/}
                <View>
                  {shopList[3].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[0].sections[5].name}
                          {/*- {shopList[0].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[5] ?
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
                        {shopList[3].sections[5] && shopList[3].sections[5].products ?
                          shopList[3].sections[5].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 6*/}
                <View>
                  {shopList[3].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[6].name}
                          {/*- {shopList[3].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[6] ?
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
                        {shopList[3].sections[6] && shopList[3].sections[6].products ?
                          shopList[3].sections[6].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 7*/}
                <View>
                  {shopList[3].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[7].name}
                          {/*- {shopList[3].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[7] ?
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
                        {shopList[3].sections[7] && shopList[3].sections[7].products ?
                          shopList[3].sections[7].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 8*/}
                <View>
                  {shopList[3].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[8].name}
                          {/*- {shopList[3].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[8] ?
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
                        {shopList[3].sections[8] && shopList[3].sections[8].products ?
                          shopList[3].sections[8].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 9*/}
                <View>
                  {/*TITULO DE LA SECCION*/}
                  {shopList[3].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[3].sections[9].name}
                          {/*- {shopList[3].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[3].sections[9] ?
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
                        {shopList[3].sections[9] && shopList[3].sections[9].products ?
                          shopList[3].sections[9].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
              </View>
              : null}

            {/*MODULO 4*/}
            {shopList[4] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '500',
                    paddingLeft: 5
                  }}>{shopList[4].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {/*{shopList[4].background !== 'default' ?*/}
                {/*  <View>*/}
                {/*    <Image source={{uri: shopList[4].background}} width={240} height={230}/>*/}
                {/*  </View>*/}
                {/*  : null}*/}

                {/*SECCION 0*/}
                <View>
                  {shopList[4].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[0].name}
                          {/*- {shopList[4].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[0] ?
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
                        {shopList[4].sections[0] && shopList[4].sections[0].products ?
                          shopList[4].sections[0].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 1*/}
                <View>
                  {shopList[4].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[1].name}
                          {/*- {shopList[4].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[1] ?
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
                        {shopList[4].sections[1] && shopList[4].sections[1].products ?
                          shopList[4].sections[1].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 2*/}
                <View>
                  {shopList[4].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[2].name}
                          {/*- {shopList[4].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[2] ?
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
                        {shopList[4].sections[2] && shopList[4].sections[2].products ?
                          shopList[4].sections[2].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 3*/}
                <View>
                  {shopList[4].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[3].name}
                          {/*- {shopList[4].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[3] ?
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
                        {shopList[4].sections[3] && shopList[4].sections[3].products ?
                          shopList[4].sections[3].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 4*/}
                <View>
                  {shopList[4].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[4].name}
                          {/*- {shopList[4].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[4] ?
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
                        {shopList[4].sections[4] && shopList[4].sections[4].products ?
                          shopList[4].sections[4].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 5*/}
                <View>
                  {shopList[4].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[5].name}
                          {/*- {shopList[4].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[5] ?
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
                        {shopList[4].sections[5] && shopList[4].sections[5].products ?
                          shopList[4].sections[5].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 6*/}
                <View>
                  {shopList[4].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[6].name}
                          {/*- {shopList[4].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[6] ?
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
                        {shopList[4].sections[6] && shopList[4].sections[6].products ?
                          shopList[4].sections[6].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 7*/}
                <View>
                  {shopList[4].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[7].name}
                          {/*- {shopList[4].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[7] ?
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
                        {shopList[4].sections[7] && shopList[4].sections[7].products ?
                          shopList[4].sections[7].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 8*/}
                <View>
                  {shopList[4].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[8].name}
                          {/*- {shopList[4].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[8] ?
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
                        {shopList[4].sections[8] && shopList[4].sections[8].products ?
                          shopList[4].sections[8].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
                {/*SECCION 9*/}
                <View>
                  {/*TITULO DE LA SECCION*/}
                  {shopList[4].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300', paddingLeft: 5}}>
                          {shopList[4].sections[9].name}
                          {/*- {shopList[4].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {shopList[4].sections[9] ?
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
                        {shopList[4].sections[9] && shopList[4].sections[9].products ?
                          shopList[4].sections[9].products.map((product: any, index: number) => {
                            return (
                              <ShopProduct product={product} key={index}></ShopProduct>
                            )
                          })
                          : null}
                      </View>
                    </ScrollView>
                    : null}
                </View>
              </View>
              : null}
          </View>
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  isHidden: {
    display: "none"
  },

  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    minHeight: '100%',
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
    width: '100%',
    height: '100%',
    gap: 5,
    paddingBottom: 35,
  },
  // NEWS ITEMS CONTAINER
  itemContainer: {
    backgroundColor: 'blue',
  },

});
