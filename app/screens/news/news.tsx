import {Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {CommonActions, useTheme} from "@react-navigation/native";
import {useNavigation} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Img} from "@/components/elements/Img";
import {FlashList} from "@shopify/flash-list";

export default function NewsScreen() {

  const fortniteService = new FortniteService();
  const navigation = useNavigation()
  const {top, bottom} = useSafeAreaInsets()
  const {colors} = useTheme();

  const [newsBattleRoyaleList, setNewsBattleRoyaleList] = useState([] as any[]);
  const [newsSaveTheWorldList, setNewsSaveTheWorldList] = useState([] as any[]);
  const [fortniteNewsList, setFortniteNewsList] = useState([] as any[]);
  const [fortniteIONewsList, setFortniteIONewsList] = useState([] as any[]);
  const [refreshing, setRefreshing] = useState(false);

  const goToNewsDetail = (newsDetail: any) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/news/newsDetail',
        params: {newsDetail}
      })
    );
  }

  const getNewsList = async () => {
    const getBatelRoyaleNews = await fortniteService.getBatelRoyaleNews();
    const getSaveTheWorldNews = await fortniteService.getSaveTheWorldNews();

    const getFortniteNews = await fortniteService.getFortniteNews();
    const getFortniteIONews = await fortniteService.getNewsV2();

    // console.log(getFortniteIONews);
    setFortniteIONewsList(getFortniteIONews.news);
    setFortniteNewsList(getFortniteNews);
    setNewsBattleRoyaleList(getBatelRoyaleNews.data.motds);
    setNewsSaveTheWorldList(getSaveTheWorldNews.data.messages);

    setRefreshing(false);
  };

  // Función de refresh
  const onRefresh = () => {
    setRefreshing(true);
    getNewsList();
  };

  useEffect(() => {
    getNewsList();
  }, []);


  return (
    <View style={{
      paddingTop: top,
      marginBottom: bottom,
    }}>

      {fortniteNewsList ?
        <View style={{marginBottom: 5, alignItems: 'center'}}>
          <Text style={{
            color: colors.text,
            fontSize: Fonts.size.xl,
            fontWeight: Fonts.weight.bold
          }}>News</Text>
        </View>
        : null
      }

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing}
                          onRefresh={onRefresh}
                          style={styles.scrollReloadContainer}/>}>
        <View style={[styles.newsContainer, {
          width: Dimensions.get("screen").width,
          minHeight: 300
        }]}>


          <FlashList
            renderItem={({item}: any) => {
              return (
                <Pressable onPress={() => goToNewsDetail(item)}>
                  {/* Contenedor de la imagen */}
                  <View style={{backgroundColor: 'red'}}>
                    <Img
                      source={{uri: item.image}}
                      style={styles.newsImage}/>
                  </View>
                  {/* Superposición de texto sobre la imagen */}
                  <View style={{backgroundColor: 'white', padding: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#1db8f3',
                        fontWeight: 700
                      }}>{new Date(item.date).toDateString()}</Text>
                    <Text style={{fontSize: 20, fontWeight: 400, textTransform: 'uppercase'}}>{item.title}</Text>
                  </View>
                </Pressable>
              );
            }}
            estimatedItemSize={30}
            estimatedListSize={{height: 300, width: Dimensions.get("screen").width}}
            data={fortniteNewsList}
            collapsable={true}
            horizontal={false}
          />

          <FlashList
            renderItem={({item}: any) => {
              return (
                <Pressable onPress={() => goToNewsDetail(item)}>
                  {/* Contenedor de la imagen */}
                  <View style={{backgroundColor: 'red'}}>
                    <Img
                      source={{uri: item.image}}
                      style={styles.newsImage}/>
                  </View>
                  {/* Superposición de texto sobre la imagen */}
                  <View style={{backgroundColor: 'white', padding: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#1db8f3',
                        fontWeight: 700
                      }}>{new Date(item.date).toDateString()}</Text>
                    <Text style={{fontSize: 20, fontWeight: 400, textTransform: 'uppercase'}}>{item.title}</Text>
                  </View>
                </Pressable>
              );
            }}
            estimatedItemSize={30}
            estimatedListSize={{height: 300, width: Dimensions.get("screen").width}}
            data={fortniteIONewsList}
            collapsable={true}
            horizontal={false}
          />

          <FlashList
            renderItem={({item}: any) => {
              return (
                <Pressable onPress={() => goToNewsDetail(item)}>
                  {/* Contenedor de la imagen */}
                  <View style={{backgroundColor: 'red'}}>
                    <Img
                      source={{uri: item.image}}
                      style={styles.newsImage}/>
                  </View>
                  {/* Superposición de texto sobre la imagen */}
                  <View style={{backgroundColor: 'white', padding: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#1db8f3',
                        fontWeight: 700
                      }}>{new Date(item.date).toDateString()}</Text>
                    <Text style={{fontSize: 20, fontWeight: 400, textTransform: 'uppercase'}}>{item.title}</Text>
                  </View>
                </Pressable>
              );
            }}
            estimatedItemSize={30}
            estimatedListSize={{height: 300, width: Dimensions.get("screen").width}}
            data={newsBattleRoyaleList}
            collapsable={true}
            horizontal={false}
          />

          <FlashList
            renderItem={({item}: any) => {
              return (
                <Pressable onPress={() => goToNewsDetail(item)}>
                  {/* Contenedor de la imagen */}
                  <View style={{backgroundColor: 'red'}}>
                    <Img
                      source={{uri: item.image}}
                      style={styles.newsImage}/>
                  </View>
                  {/* Superposición de texto sobre la imagen */}
                  <View style={{backgroundColor: 'white', padding: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#1db8f3',
                        fontWeight: 700
                      }}>{new Date(item.date).toDateString()}</Text>
                    <Text style={{fontSize: 20, fontWeight: 400, textTransform: 'uppercase'}}>{item.title}</Text>
                  </View>
                </Pressable>
              );
            }}
            estimatedItemSize={30}
            estimatedListSize={{height: 300, width: Dimensions.get("screen").width}}
            data={newsSaveTheWorldList}
            collapsable={true}
            horizontal={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scrollReloadContainer: {
  },

  newsContainer: {
    padding: 10,
    gap: 15,
  },

  sectionTitle: {
    textAlign: 'center', // Alinear horizontalmente
    textAlignVertical: 'center', // Alinear verticalmente
    paddingTop: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 10,
  },
  newsImage: {
    objectFit: 'fill',
    height: 230,
  },

  // NEWS LIST CONTAINER
  newsListContainer: {
    gap: 5,
  },

  // NEWS ITEMS CONTAINER
  newsItemComponent: {
  },
  titleContainer: {
    width: '100%',
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
});
