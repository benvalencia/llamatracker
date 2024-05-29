import {Image, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
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
  const [testShopList, setTestShopList] = useState([] as any);

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

    // let shopListArray: any = [];
    // await rawShotListGroupedById.forEach((entry: any) => {
    //   console.log('entry ', entry)
    //
    //   // let moduleObject: any = {}
    //   // let sectionObject: any = {}
    //   // let productObject = {}
    //   //
    //   // productObject = {
    //   //   ...{banner: entry.banner},
    //   //   ...{bundle: entry.bundle},
    //   //   ...{layout: entry.layout},
    //   //   ...{finalPrice: entry.finalPrice},
    //   //   ...{regularPrice: entry.regularPrice},
    //   //   ...{name: entry.layout ? entry.layout.name : null},
    //   //   ...{showIneligibleOffers: entry.layout ? entry.layout.showIneligibleOffers : null},
    //   //   ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},
    //   //
    //   //   // ...{items: entry.items ? entry.items : null}
    //   // };
    //   //
    //   // sectionObject = {
    //   //   ...{id: entry.layout ? entry.layout.id : null},
    //   //   ...{index: entry.layout ? entry.layout.index : null},
    //   //   ...{name: entry.layout ? entry.layout.name : null},
    //   //   ...{showIneligibleOffers: entry.layout ? entry.layout.showIneligibleOffers : null},
    //   //   ...{products: []},
    //   // };
    //   // moduleObject = {
    //   //   ...{category: entry.layout ? entry.layout.category : 'Uncategorized'},
    //   //   ...{background: entry.layout ? entry.layout.background ? entry.layout.background : 'default' : 'default'},
    //   //   ...{sections: []},
    //   // };
    // })


    let testingArray: any = []
    await shopRaw.data?.featured.entries.forEach((entry: any) => {
      let testingObject: any = {}
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

      testingObject = {
        ...{category: entry.layout ? entry.layout.category : 'Uncategorized'},
        ...{background: entry.layout ? entry.layout.background ? entry.layout.background : 'default' : 'default'},
        ...{sections: [sectionObject]},
      };


      const module = testingArray.find((element: any) => element.category === entry.layout.category);
      if (module) {

        const section = module.sections.find((element: any) => element.id === entry.layout.id);
        if (section) {
          section.products.push(productObject)
        } else {
          module.sections.push(sectionObject);
        }
      } else {
        testingArray.push(testingObject);
      }
    });

    // console.log('testingArray >>>', testingArray.length);
    // console.log('testingArray 0 >>>', testingArray[0].category);
    //
    // console.log('testingArray.section >>>', testingArray[0].sections[3]);

    // shopRaw.data?.featured.entries
    // console.log('entry >>> ', shopRaw.data?.featured.entries[16])

    // console.log('items.description >>> ', shopRaw.data.featured.entries[10].items[0].description)
    //
    // console.log('items.images.featured >>> ', shopRaw.data.featured.entries[10].items[0].images.featured)
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
    setTestShopList(testingArray ? testingArray.map((i: any) => i) : null);
    setRefreshing(false);
  };

  // Función de refresh
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
        <View style={{marginBottom: 15}}>
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

        <View style={styles.shopListContainer}>
          <View style={{width: 'auto'}}>
            {/*MODULO 0*/}
            {testShopList[0] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: '500'}}>{testShopList[0].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {testShopList[0].background !== 'default' ?
                  <View>
                    <Image source={{uri: testShopList[0].background}} width={240} height={230}/>
                  </View>
                  : null}

                {/*SECCION 0*/}
                <View>
                  {testShopList[0].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[0].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[0] ?
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
                        {testShopList[0].sections[0] && testShopList[0].sections[0].products ?
                          testShopList[0].sections[0].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[1].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[1] ?
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
                        {testShopList[0].sections[1] && testShopList[0].sections[1].products ?
                          testShopList[0].sections[1].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[2].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[2] ?
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
                        {testShopList[0].sections[2] && testShopList[0].sections[2].products ?
                          testShopList[0].sections[2].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[3].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[3] ?
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
                        {testShopList[0].sections[3] && testShopList[0].sections[3].products ?
                          testShopList[0].sections[3].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[4].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[4] ?
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
                        {testShopList[0].sections[4] && testShopList[0].sections[4].products ?
                          testShopList[0].sections[4].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[5].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[5] ?
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
                        {testShopList[0].sections[5] && testShopList[0].sections[5].products ?
                          testShopList[0].sections[5].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[6].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[6] ?
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
                        {testShopList[0].sections[6] && testShopList[0].sections[6].products ?
                          testShopList[0].sections[6].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[7].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[7] ?
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
                        {testShopList[0].sections[7] && testShopList[0].sections[7].products ?
                          testShopList[0].sections[7].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[8].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[8] ?
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
                        {testShopList[0].sections[8] && testShopList[0].sections[8].products ?
                          testShopList[0].sections[8].products.map((product: any, index: number) => {
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
                  {testShopList[0].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[9].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[0].sections[9] ?
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
                        {testShopList[0].sections[9] && testShopList[0].sections[9].products ?
                          testShopList[0].sections[9].products.map((product: any, index: number) => {
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
            {testShopList[1] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: '500'}}>{testShopList[1].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {testShopList[1].background !== 'default' ?
                  <View>
                    <Image source={{uri: testShopList[1].background}} width={240} height={230}/>
                  </View>
                  : null}

                {/*SECCION 0*/}
                <View>
                  {testShopList[1].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[0].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[0] ?
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
                        {testShopList[1].sections[0] && testShopList[1].sections[0].products ?
                          testShopList[1].sections[0].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[1].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[1] ?
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
                        {testShopList[1].sections[1] && testShopList[1].sections[1].products ?
                          testShopList[1].sections[1].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[2].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[2] ?
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
                        {testShopList[1].sections[2] && testShopList[1].sections[2].products ?
                          testShopList[1].sections[2].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[3].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[3] ?
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
                        {testShopList[1].sections[3] && testShopList[1].sections[3].products ?
                          testShopList[1].sections[3].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[4].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[4] ?
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
                        {testShopList[1].sections[4] && testShopList[1].sections[4].products ?
                          testShopList[1].sections[4].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[5].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[5] ?
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
                        {testShopList[1].sections[5] && testShopList[1].sections[5].products ?
                          testShopList[1].sections[5].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[6].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[6] ?
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
                        {testShopList[1].sections[6] && testShopList[1].sections[6].products ?
                          testShopList[1].sections[6].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[7].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[7] ?
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
                        {testShopList[1].sections[7] && testShopList[1].sections[7].products ?
                          testShopList[1].sections[7].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[8].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[8] ?
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
                        {testShopList[1].sections[8] && testShopList[1].sections[8].products ?
                          testShopList[1].sections[8].products.map((product: any, index: number) => {
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
                  {testShopList[1].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[1].sections[9].name} - 8hrs 22min 10sec
                          {/*- {testShopList[1].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[1].sections[9] ?
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
                        {testShopList[1].sections[9] && testShopList[1].sections[9].products ?
                          testShopList[1].sections[9].products.map((product: any, index: number) => {
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
            {testShopList[2] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: '500'}}>{testShopList[2].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {testShopList[2].background !== 'default' ?
                  <View>
                    <Image source={{uri: testShopList[2].background}} width={240} height={230}/>
                  </View>
                  : null}

                {/*SECCION 0*/}
                <View>
                  {testShopList[2].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[0].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[0] ?
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
                        {testShopList[2].sections[0] && testShopList[2].sections[0].products ?
                          testShopList[2].sections[0].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[1].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[1] ?
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
                        {testShopList[2].sections[1] && testShopList[2].sections[1].products ?
                          testShopList[2].sections[1].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[2].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[2] ?
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
                        {testShopList[2].sections[2] && testShopList[2].sections[2].products ?
                          testShopList[2].sections[2].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[3].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[3] ?
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
                        {testShopList[2].sections[3] && testShopList[2].sections[3].products ?
                          testShopList[2].sections[3].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[4].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[4] ?
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
                        {testShopList[2].sections[4] && testShopList[2].sections[4].products ?
                          testShopList[2].sections[4].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[5].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[5] ?
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
                        {testShopList[2].sections[5] && testShopList[2].sections[5].products ?
                          testShopList[2].sections[5].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[6].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[6] ?
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
                        {testShopList[2].sections[6] && testShopList[2].sections[6].products ?
                          testShopList[2].sections[6].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[7].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[7] ?
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
                        {testShopList[2].sections[7] && testShopList[2].sections[7].products ?
                          testShopList[2].sections[7].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[8].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[8] ?
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
                        {testShopList[2].sections[8] && testShopList[2].sections[8].products ?
                          testShopList[2].sections[8].products.map((product: any, index: number) => {
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
                  {testShopList[2].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[2].sections[9].name} - 8hrs 22min 10sec
                          {/*- {testShopList[2].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[2].sections[9] ?
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
                        {testShopList[2].sections[9] && testShopList[2].sections[9].products ?
                          testShopList[2].sections[9].products.map((product: any, index: number) => {
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
            {testShopList[3] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: '500'}}>{testShopList[3].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {testShopList[3].background !== 'default' ?
                  <View>
                    <Image source={{uri: testShopList[3].background}} width={240} height={230}/>
                  </View>
                  : null}

                {/*SECCION 0*/}
                <View>
                  {testShopList[3].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[0].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[0] ?
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
                        {testShopList[3].sections[0] && testShopList[3].sections[0].products ?
                          testShopList[3].sections[0].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[1].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[1] ?
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
                        {testShopList[3].sections[1] && testShopList[3].sections[1].products ?
                          testShopList[3].sections[1].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[2].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[2] ?
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
                        {testShopList[3].sections[2] && testShopList[3].sections[2].products ?
                          testShopList[3].sections[2].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[3].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[3] ?
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
                        {testShopList[3].sections[3] && testShopList[3].sections[3].products ?
                          testShopList[3].sections[3].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[4].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[4] ?
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
                        {testShopList[3].sections[4] && testShopList[3].sections[4].products ?
                          testShopList[3].sections[4].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[0].sections[5].name} - 8hrs 22min 10sec
                          {/*- {testShopList[0].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[5] ?
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
                        {testShopList[3].sections[5] && testShopList[3].sections[5].products ?
                          testShopList[3].sections[5].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[6].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[6] ?
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
                        {testShopList[3].sections[6] && testShopList[3].sections[6].products ?
                          testShopList[3].sections[6].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[7].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[7] ?
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
                        {testShopList[3].sections[7] && testShopList[3].sections[7].products ?
                          testShopList[3].sections[7].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[8].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[8] ?
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
                        {testShopList[3].sections[8] && testShopList[3].sections[8].products ?
                          testShopList[3].sections[8].products.map((product: any, index: number) => {
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
                  {testShopList[3].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[3].sections[9].name} - 8hrs 22min 10sec
                          {/*- {testShopList[3].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[3].sections[9] ?
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
                        {testShopList[3].sections[9] && testShopList[3].sections[9].products ?
                          testShopList[3].sections[9].products.map((product: any, index: number) => {
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
            {testShopList[4] ?
              <View style={{width: 'auto', backgroundColor: Colors.primary, gap: 5}}>
                {/*TITULO MODULO*/}
                <View>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: '500'}}>{testShopList[4].category}</Text>
                </View>
                {/*BACKGRUND DEL MODULO*/}
                {testShopList[4].background !== 'default' ?
                  <View>
                    <Image source={{uri: testShopList[4].background}} width={240} height={230}/>
                  </View>
                  : null}

                {/*SECCION 0*/}
                <View>
                  {testShopList[4].sections[0] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[0].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[0].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[0] ?
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
                        {testShopList[4].sections[0] && testShopList[4].sections[0].products ?
                          testShopList[4].sections[0].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[1] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[1].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[1].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[1] ?
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
                        {testShopList[4].sections[1] && testShopList[4].sections[1].products ?
                          testShopList[4].sections[1].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[2] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[2].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[2].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[2] ?
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
                        {testShopList[4].sections[2] && testShopList[4].sections[2].products ?
                          testShopList[4].sections[2].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[3] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[3].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[3].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[3] ?
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
                        {testShopList[4].sections[3] && testShopList[4].sections[3].products ?
                          testShopList[4].sections[3].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[4] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[4].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[4].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[4] ?
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
                        {testShopList[4].sections[4] && testShopList[4].sections[4].products ?
                          testShopList[4].sections[4].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[5] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[5].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[5].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[5] ?
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
                        {testShopList[4].sections[5] && testShopList[4].sections[5].products ?
                          testShopList[4].sections[5].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[6] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[6].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[6].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[6] ?
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
                        {testShopList[4].sections[6] && testShopList[4].sections[6].products ?
                          testShopList[4].sections[6].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[7] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[7].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[7].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[7] ?
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
                        {testShopList[4].sections[7] && testShopList[4].sections[7].products ?
                          testShopList[4].sections[7].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[8] ?
                    <View style={{width: 'auto'}}>
                      {/*TITULO DE LA SECCION*/}
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[8].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[8].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[8] ?
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
                        {testShopList[4].sections[8] && testShopList[4].sections[8].products ?
                          testShopList[4].sections[8].products.map((product: any, index: number) => {
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
                  {testShopList[4].sections[9] ?
                    <View style={{width: 'auto'}}>
                      <View>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>
                          {testShopList[4].sections[9].name} - 8hrs 22min 10sec
                          {/*- {testShopList[4].sections[9].index}*/}
                        </Text>
                      </View>
                    </View>
                    : null}

                  {/*PRODUCTS CONTAINER*/}
                  {testShopList[4].sections[9] ?
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
                        {testShopList[4].sections[9] && testShopList[4].sections[9].products ?
                          testShopList[4].sections[9].products.map((product: any, index: number) => {
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
  },
  scrollReloadContainer: {
    backgroundColor: Colors.primary,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // TILE SIZES
  Size_2_x_2: {
    backgroundColor: 'red',
    padding: 2,
  },
  Size_1_x_2: {
    backgroundColor: 'blue',
    padding: 2,
  },
  Size_1_x_1: {
    backgroundColor: 'pink',
    padding: 2,
  },
  // SHOP LIST CONTAINER
  shopListContainer: {
    width: '100%',
    gap: 5,
    paddingBottom: 60,
  },
  // NEWS ITEMS CONTAINER
  itemContainer: {
    backgroundColor: 'blue',
  },

});
