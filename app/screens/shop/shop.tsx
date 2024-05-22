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
  const [testShopList, setTestShopList] = useState([] as any);

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
      if (objToTransform.data.date
        && new Date(objToTransform.data.date).toDateString() !== new Date().toDateString()) {

        const getShopCombined = await fortniteService.getBatelRoyaleShopCombined();

        const jsonValue = JSON.stringify(getShopCombined);
        await AsyncStorage.setItem('daily-shop', jsonValue);

        setShopCache(jsonValue as any)
        setShopRaw(getShopCombined as any)
      }
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

    await shopRaw.data.featured.entries.forEach((entry: any) => {
      let formNewObject = {}

      formNewObject = {
        ...{banner: entry.banner},
        ...{bundle: entry.bundle},
        ...{finalPrice: entry.finalPrice},
        ...{regularPrice: entry.regularPrice},
        ...{layout: entry.layout},
        ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},
        ...{items: entry.items ? entry.items : null}

      };

      tienda.push(formNewObject);
    })

    let testingArray: any = []
    await shopRaw.data.featured.entries.forEach((entry: any) => {
      let testingObject: any = {}
      let sectionObject: any = {}
      let productObject = {}

      productObject = {
        ...{banner: entry.banner},
        ...{bundle: entry.bundle},
        ...{finalPrice: entry.finalPrice},
        ...{regularPrice: entry.regularPrice},
        ...{id: entry.layout.id},
        ...{index: entry.layout.index},
        ...{name: entry.layout.name},
        ...{showIneligibleOffers: entry.layout.showIneligibleOffers},
        ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},

        // ...{background: entry.layout.background ? entry.layout.background : 'default'},
        // ...{items: entry.items ? entry.items : null}
      };

      sectionObject = {
        // ...{banner: entry.banner},
        // ...{bundle: entry.bundle},
        // ...{finalPrice: entry.finalPrice},
        // ...{regularPrice: entry.regularPrice},
        ...{id: entry.layout.id},
        ...{index: entry.layout.index},
        ...{name: entry.layout.name},
        ...{showIneligibleOffers: entry.layout.showIneligibleOffers},
        ...{products: []},
        // ...{background: entry.layout.background ? entry.layout.background : 'default'},
        // ...{products: [productObject]},
        // ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},
        // ...{items: entry.items ? entry.items : null}
      };
      testingObject = {
        // ...{banner: entry.banner},
        // ...{bundle: entry.bundle},
        // ...{finalPrice: entry.finalPrice},
        // ...{regularPrice: entry.regularPrice},
        ...{category: entry.layout.category},
        ...{background: entry.layout.background ? entry.layout.background : 'default'},
        ...{sections: []},
        // ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},
        // ...{items: entry.items ? entry.items : null}
      };


      // TODO: si NO encuentra una category hacer push a testingArray de una categoría
      // TODO: si encuentra una categoría hacer push a sections de una sección
      if (testingArray.find((item: any) => item.category == entry.layout.category)) {
        // console.log('Categoría encontrada', entry.layout.category);
        // TODO: si encuentra una section ya pues no hacer push a category
        // TODO: si encuentra una categoria hacer push a product
        testingArray.forEach((module: any, moduleIndex: number) => {

          const isFound = module.sections.find((section: any) => section.id == entry.layout.id) !== undefined;
          if (isFound) {
            testingArray[moduleIndex].sections.forEach((section: any, sectionIndex: number) => {
              if (section.id === entry.layout.id) {
                testingArray[moduleIndex].sections[sectionIndex].products.push(productObject);
              }
            })
          } else {
            testingArray[moduleIndex].sections.push(sectionObject)
          }
        })
      } else {
        sectionObject.products.push(productObject)
        testingObject.sections.push(sectionObject);
        testingArray.push(testingObject);
      }
    });
    console.log('testingArray.section.products >>>', testingArray.length);
    console.log('testingArray.section.products >>>', testingArray[0].sections.length);
    console.log('---------')

    // console.log('items >>> ', shopRaw.data.featured.entries[0].items.length)
    // console.log('items.added >>> ', shopRaw.data.featured.entries[10].items[0].added)
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
          <View>
            {testShopList[0] ?
              <View>
                <Text>
                  {testShopList[0].category}
                </Text>
                <Text>
                  {testShopList[0].background}
                </Text>
              </View>
              : null}
          </View>
          <View>
            {testShopList[1] ?
              <View>
                <Text>
                  {testShopList[1].category}
                </Text>
                <Text>
                  {testShopList[1].background}
                </Text>
              </View>
              : null}
          </View>
          <View>
            {testShopList[2] ?
              <View>
                <Text>
                  {testShopList[2].category}
                </Text>
                <Text>
                  {testShopList[2].background}
                </Text>
              </View>
              : null}
          </View>
          <View>
            {testShopList[3] ?
              <View>
                <Text>
                  {testShopList[3].category}
                </Text>
                <Text>
                  {testShopList[3].background}
                </Text>
              </View>
              : null}
          </View>

          {shopList ? shopList.map((item: any, index: number) => {
            return (
              // IMAGE PRODUCT
              <View style={{
                padding: 5,
                borderRadius: 10,
                overflow: 'hidden',
                width: 260,
                height: 250,
                alignSelf: 'flex-start',
                justifyContent: 'space-between'
              }} key={index}>
                <View style={{position: 'absolute', zIndex: 0}}>
                  {item.materialInstances ?
                    item.materialInstances[0] ?
                      <View>
                        <Image source={{uri: item.materialInstances[0].images.Background}} width={260} height={250}/>
                      </View>
                      : null
                    : null}
                </View>

                {/*PRODUCT OFFER ALERT*/}
                <View>
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
                </View>

                {/*PRODUCT INFORMATION*/}
                <View style={{}}>
                  {/*PRODUCT NAME*/}
                  <View>
                    {item.bundle ?
                      <View>
                        <Image style={styles.isHidden} source={{uri: item.bundle.image}} width={150} height={150}/>
                        <Text style={{color: 'white'}}>{item.bundle.name}</Text>
                        <Text style={{color: 'white'}}>{item.bundle.info}</Text>
                      </View>
                      : null}
                  </View>
                  {/*PRODUCT PRICE*/}
                  <View>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                      <Image source={require('../../../assets/images/vbuck/vbuck.png')}
                             style={{width: 25, height: 25}}></Image>
                      <Text style={{color: 'white'}}>{item.finalPrice}</Text>

                      {item.finalPrice !== item.regularPrice ?
                        <Text style={{color: 'white', opacity: .5}}>{item.regularPrice}</Text>
                        : null
                      }
                    </View>
                  </View>
                </View>

                {/*{item.bundle ?*/}
                {/*  <View>*/}
                {/*    <Image style={styles.isHidden} source={{uri: item.bundle.image}} width={150} height={150}/>*/}
                {/*    <Text>{item.bundle.name}</Text>*/}
                {/*    <Text>{item.bundle.info}</Text>*/}
                {/*  </View>*/}
                {/*  : null}*/}

                {item.layout ?
                  <View>
                    <Image style={styles.isHidden} source={{uri: item.layout.background}} width={150} height={150}/>
                    {/*<Text>{item.layout.background}</Text>*/}
                    <Text style={{}}>{item.layout.category}</Text>
                    <Text style={styles.isHidden}>{item.layout.id}</Text>
                    <Text style={styles.isHidden}>{item.layout.name}</Text>
                    <Text style={styles.isHidden}>{item.layout.showIneligibleOffers}</Text>
                  </View>
                  : null}

                {/*<View style={{backgroundColor: 'red', position: 'absolute', zIndex: 0}}>*/}
                {/*  {item.materialInstances ?*/}
                {/*    item.materialInstances[0] ?*/}
                {/*      <View>*/}
                {/*        <Image source={{uri: item.materialInstances[0].images.Background}} width={150} height={150}/>*/}
                {/*      </View>*/}
                {/*      : null*/}
                {/*    : null}*/}
                {/*</View>*/}


                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[1] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[1].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[1].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[2] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[2].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[2].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[3] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[3].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[3].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[4] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[4].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[4].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[5] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[5].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[5].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[6] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[6].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[6].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[7] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[7].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[7].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[8] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[8].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[8].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}

                {/*{item.materialInstances ?*/}
                {/*  item.materialInstances[9] ?*/}
                {/*    <View style={styles.isHidden}>*/}
                {/*      /!*<Text>{item.materialInstances[9].images.Background}</Text>*!/*/}
                {/*      <Image source={{uri: item.materialInstances[9].images.Background}} width={150} height={150}/>*/}
                {/*    </View>*/}
                {/*    : null*/}
                {/*  : null}*/}


                {/*PRICE*/}
                {/*<View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>*/}
                {/*  <Image source={require('../../../assets/images/vbuck/vbuck.png')}*/}
                {/*         style={{width: 25, height: 25}}></Image>*/}
                {/*  <Text style={{color: 'white'}}>{item.finalPrice}</Text>*/}
                {/*  <Text style={{color: 'white', opacity: .5}}>{item.regularPrice}</Text>*/}
                {/*</View>*/}

              </View>
            )
          }) : <Text>test</Text>}
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

  // SHOP LIST CONTAINER
  shopListContainer: {
    gap: 5,
  },
  // NEWS ITEMS CONTAINER
  itemContainer: {
    backgroundColor: 'blue',
  },

});
