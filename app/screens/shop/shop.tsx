import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {useNavigation} from "expo-router";
import React, {useEffect, useState} from "react";
import {CommonActions} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ShopModule} from "@/components/ShopModule";

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
    // const getShopPlaylist = await fortniteService.getMap();
    // console.log('testing >> ', getShopPlaylist.data.pois)

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
        ...{name: entry.bundle ? entry.bundle.name : entry.items[0].name ? entry.items[0].name : entry.layout ? entry.layout.name : 'unnamed'},
        ...{showIneligibleOffers: entry.layout ? entry.layout.showIneligibleOffers : null},
        ...{materialInstances: entry.newDisplayAsset ? entry.newDisplayAsset.materialInstances : null},
        ...{image: entry.items[0].images ? entry.items[0].images.featured : null},

        ...{items: entry.items ? entry.items : null}
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

            {/*MODULE*/}
            {shopList.map((module: any, index: number) => {
              return (
                <ShopModule module={module} key={index}></ShopModule>
              )
            })}

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
