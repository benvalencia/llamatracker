import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import React, {useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ShopModule} from "@/components/shopComponents/ShopModule";

export default function ShopScreen() {
  const fortniteService = new FortniteService();
  const {top, bottom} = useSafeAreaInsets()

  const [shopInformation, setShopInformation] = useState({} as any);
  const [shopList, setShopList] = useState([] as any);

  const [shopRaw, setShopRaw] = useState({} as any);
  const [shopCache, setShopCache] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getStoreShop = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('daily-shop');
      const objToTransform = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (objToTransform.lastUpdate.date
        && new Date(objToTransform.lastUpdate.date).toDateString() !== new Date().toDateString()) {

        const getShopCombined = await fortniteService.getDailyShop();

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
    if (shopCache == null) {
      const getShopCombined = await fortniteService.getDailyShop();

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

    setShopInformation({date: shopRaw ? shopRaw.lastUpdate?.date : null})

    let shopListArrayBuilder: any = []
    shopRaw.shop
      ? await shopRaw.shop.forEach((entry: any) => {
      let productObject = {
        ...{
          banner: {
            display: !!entry.banner,
            intensity: entry.banner ? entry.banner.intensity : null,
            name: entry.banner ? entry.banner.name : null,
          }
        },
        ...{name: entry.displayName},
        ...{description: entry.displayDescription},
        ...{size: entry.tileSize},
        ...{finalPrice: entry.price.finalPrice},
        ...{regularPrice: entry.price.regularPrice},
        ...{in: entry.offerDates.in},
        ...{out: entry.offerDates.out},
        ...{series: entry.series ? entry.series : null},
        ...{rarity: entry.rarity},
        ...{type: entry.displayType},
        ...{set: entry.set},
        ...{offerId: entry.offerId},
        ...{id: entry.mainId},
        ...{assets: entry.displayAssets},

        ...{items: entry.granted ? entry.granted : null}
      };

      let sectionObject = {
        ...{id: entry.section.id},
        ...{name: entry.section.name},
        ...{products: [productObject]},
      };

      let moduleObject = {
        ...{category: entry.section ? entry.section.category : 'Uncategorized'},
        ...{sections: [sectionObject]},
      };

      const module = shopListArrayBuilder.find((element: any) => element.category === entry.section.category);
      if (module) {
        const section = module.sections.find((element: any) => element.name === entry.section.name);
        if (section) {
          section.products.push(productObject)
        } else {
          module.sections.push(sectionObject);
        }
      } else {
        shopListArrayBuilder.push(moduleObject);
      }
      })
      : null


    setShopList(shopListArrayBuilder ? shopListArrayBuilder.reverse().map((i: any) => i) : null);
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
