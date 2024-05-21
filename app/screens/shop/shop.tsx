import {Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {useNavigation} from "expo-router";
import React, {useEffect, useState} from "react";
import {CommonActions} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function ShopScreen() {
  const fortniteService = new FortniteService();
  const navigation = useNavigation()
  const {top} = useSafeAreaInsets()

  const [shopList, setShopList] = useState({} as any);
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

  const getShopList = async () => {
    const getShop = await fortniteService.getBatelRoyaleShop();

    console.log('items >>>', getShop.data.featured.entries[1].bundle.image)

    setShopList(getShop.data);

    setRefreshing(false);
  };

  // Función de refresh
  const onRefresh = () => {
    setRefreshing(true);
    getShopList();
  };

  useEffect(() => {
    getShopList();
  }, []);


  const NewsItemBuilder = () => {
    let newsItems: any = []
    shopList.featured?.entries.map((item: any, index: number) => {
      newsItems.push(<Text key={index}>categories: {item.categories}</Text>)
    })
    console.log(newsItems);

    return (
      <View>
        {newsItems}
      </View>
    )
  }


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
          {/*<Text>daily: {shopList.daily}</Text>*/}
          <Text>{new Date(shopList.date).toLocaleDateString('spanish', {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          })}</Text>
          <Text>hash: {shopList.hash}</Text>
          {/*<Text>vbuckIcon: {shopList.vbuckIcon}</Text>*/}
          <Image source={{uri: shopList.vbuckIcon}} width={45} height={45}></Image>

        </View>
        <View style={styles.shopListContainer}>
          {/*<NewsItemBuilder></NewsItemBuilder>*/}

          {shopList.featured?.entries.map((item: any, index: number) => {
            return (
              <Pressable style={styles.itemContainer} key={index} onPress={() => goToItemDetail(item)}>
                <Text>categories: {item.categories}</Text>
                <Text>finalPrice: {item.finalPrice}</Text>
                <Text>regularPrice: {item.regularPrice}</Text>
                <Text>section: {item.section}</Text>

                {/*<Text>devName: {item.devName}</Text>*/}
                {/*<Text>displayAssetPath: {item.displayAssetPath}</Text>*/}
                {/*<Text>giftable: {item.giftable ? 'true' : 'false'}</Text>*/}
                {/*<Text>newDisplayAssetPath: {item.newDisplayAssetPath}</Text>*/}
                {/*<Text>offerId: {item.offerId}</Text>*/}
                {/*<Text>refundable: {item.refundable ? 'true' : 'false'}</Text>*/}
                {/*<Text>sectionId: {item.sectionId}</Text>*/}
                {/*<Text>sortPriority: {item.sortPriority}</Text>*/}
                {/*<Text>tileSize: {item.tileSize}</Text>*/}

                {/*banner INFORMATION*/}
                {/*<Text>banner.backendValue: {item.banner?.backendValue}</Text>*/}
                {/*<Text>banner.intensity: {item.banner?.intensity}</Text>*/}
                {/*<Text>banner.value: {item.banner?.value}</Text>*/}

                {/*NewDisplayAsset INFORMATION*/}
                {/*<Text>newDisplayAsset.id: {item.newDisplayAsset?.id}</Text>*/}


                {/*LAYOUT INFORMATION*/}
                {/*<Text>layout.background: {item.layout?.background}</Text>*/}
                {/*<Image source={{uri: item.layout?.background}} style={{*/}
                {/*  height: 150,*/}
                {/*  objectFit: 'contain'*/}
                {/*}}></Image>*/}
                {/*<Text>layout.category: {item.layout?.category}</Text>*/}
                {/*<Text>layout.id: {item.layout?.id}</Text>*/}
                {/*<Text>layout.index: {item.layout?.index}</Text>*/}
                <Text>layout.name: {item.layout?.name}</Text>
                <Text>layout.showIneligibleOffers: {item.layout?.showIneligibleOffers}</Text>

                {/*BUNDLE INFORMATION*/}
                {item.bundle?.info === 'Bundle' ?
                  <View>
                    <View>
                      {/*<Text>bundle.image: {item.bundle?.image}</Text>*/}
                      <Image source={{uri: item.bundle?.image}} style={{
                        width: 150,
                        height: 150,
                        zIndex: 1,
                        objectFit: 'contain',
                        position: 'absolute',
                        alignSelf: 'center',
                      }}/>
                      <Image source={{uri: item.layout?.background}} style={{
                        height: 150,
                      }}></Image>
                    </View>
                    {/*<Text>bundle.info: {item.bundle?.info}</Text>*/}
                    <Text>bundle.name: {item.bundle?.name}</Text>
                  </View> : null
                }

              </Pressable>
            )
          })}
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
