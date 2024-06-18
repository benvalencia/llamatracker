import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import React, {useEffect, useMemo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ShopModule} from "@/components/shopComponents/ShopModule";
import {useTheme} from "@react-navigation/native";
import {LocalStoreService} from "@/app/services/localStore/localStore.service";
import {Fonts} from "@/constants/Colors";
import Timer from "@/components/elements/Timer";
import {Loader} from "@/components/elements/Loader";

export default function ShopScreen() {
  const fortniteService = useMemo(() => new FortniteService(), []);
  const localStoreService = useMemo(() => new LocalStoreService(), []);

  const {top, bottom} = useSafeAreaInsets()
  const {colors} = useTheme();


  const [shopList, setShopList] = useState([] as any);
  const [shopRaw, setShopRaw] = useState({} as any);
  const [shopCache, setShopCache] = useState(null);
  const [refreshing, setRefreshing] = useState(false);


  const todayShopDate = {date: shopRaw ? shopRaw.lastUpdate?.date : null}

  const getStoreShop = async () => {

    localStoreService.getStore('daily-shop').then(async (response) => {
      try {
        const jsonValue = await AsyncStorage.getItem('daily-shop');
        if (response.lastUpdate.date
          && new Date(response.lastUpdate.date).toDateString() !== new Date().toDateString()) {

          const getShopCombined = await fortniteService.getDailyShop();

          const jsonValue = JSON.stringify(getShopCombined);
          await AsyncStorage.setItem('daily-shop', jsonValue);

          setShopCache(jsonValue as any)
          setShopRaw(getShopCombined)
        } else {
          setShopCache(jsonValue as any)
          setShopRaw(response as any)
        }
      } catch (err) {
        // error reading value
        console.log(err)
      }
    })


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
          ...{index: entry.section.id},

          ...{items: entry.granted ? entry.granted : null}
        };

        let sectionObject = {
          ...{name: entry.section.name},

          ...{id: entry.section.id},
          ...{priority: entry.priority},
          ...{groupIndex: entry.groupIndex},
          ...{landingIndex: entry.section.landingIndex},

          ...{products: [productObject]},
        };

        let moduleObject = {
          ...{category: entry.section.category},

          ...{priority: entry.priority},
          ...{landingIndex: entry.section.landingIndex},

          ...{sections: [sectionObject]},
        };

        const module = shopListArrayBuilder.find((element: any) => element.category === entry.section.category);
        if (module) {
          const section = module.sections.find((element: any) => element.name === entry.section.name);
          if (section) {
            section.products.sort((a: any, b: any) => b.index.localeCompare(a.index))
            section.products.push(productObject)
          } else {
            module.sections.push(sectionObject);
          }
        } else {
          shopListArrayBuilder.push(moduleObject);
        }
      })
      : null

    shopListArrayBuilder.reverse();
    shopListArrayBuilder.forEach((modulo: any) => modulo.sections.reverse())


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
    <View style={{paddingTop: top, marginBottom: bottom + 40}}>

      {shopList[0] === undefined ?
        <View style={{position: 'absolute', top: '50%', width: '100%'}}>
          <Loader></Loader>
        </View>
        : null}

      {shopList[0] ?
        <View style={{alignItems: 'center', marginBottom: 5}}>
          <Text style={{
            color: colors.text,
            fontSize: Fonts.size.xl,
            fontWeight: Fonts.weight.bold
          }}>Daily Shop</Text>
          <Text style={{
            color: colors.text,
            fontSize: Fonts.size.l,
            fontWeight: Fonts.weight.normal
          }}>{new Date(todayShopDate.date).toLocaleDateString('spanish', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          })}</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{
              color: colors.text,
              fontSize: Fonts.size.s,
              fontWeight: Fonts.weight.light
            }}>Next update in </Text>
            <Timer
              size={Fonts.size.s}
              weight={Fonts.weight.light}
              targetDate={new Date(todayShopDate.date).setDate(new Date(todayShopDate.date).getDate() + 1)}></Timer>
          </View>
        </View>
        : null}

      <ScrollView
        contentContainerStyle={[styles.container]}
        refreshControl={
          <RefreshControl refreshing={refreshing}
                          onRefresh={onRefresh}
          />}>
        <View>
          <View>
              {/*MODULE*/}
              {shopList.map((module: any, index: number) => {
                return (
                  <ShopModule module={module} key={index}></ShopModule>
                )
              })}
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: '100%',
  },
});
