import {Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Fonts} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {CommonActions, useTheme} from "@react-navigation/native";
import {useNavigation} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Img} from "@/components/elements/Img";
import {FlashList} from "@shopify/flash-list";
import {Loader} from "@/components/elements/Loader";

export default function NewsScreen() {

  const fortniteService = new FortniteService();
  const navigation = useNavigation()
  const {top, bottom} = useSafeAreaInsets()
  const {colors} = useTheme();

  const [newsList, setNewsList] = useState([] as any[]);

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

    setNewsList([...getFortniteNews, ...getFortniteIONews.news, ...getBatelRoyaleNews.data.motds, ...getSaveTheWorldNews.data.messages])

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
      height: '100%'
    }}>

      {newsList[0] == undefined ?
        <View style={{position: 'absolute', top: '40%', width: '100%'}}>
          <Loader></Loader>
        </View>
        : null}

      {newsList[0] ?
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
        refreshControl={
          <RefreshControl refreshing={refreshing}
                          onRefresh={onRefresh}/>
        }>

        <View style={[styles.newsContainer, {
          minHeight: 300
        }]}>

          <FlashList
            renderItem={({item}: any) => {
              return (
                <Pressable onPress={() => goToNewsDetail(item)} style={{margin: 10}}>
                  {/* Contenedor de la imagen */}
                  <View>
                    <Img
                      source={{uri: item.image}}
                      style={styles.newsImage}/>
                  </View>
                  {/* Superposición de texto sobre la imagen */}
                  <View style={{backgroundColor: colors.text, padding: 10}}>
                    <Text
                      style={{
                        fontSize: Fonts.size.xs,
                        color: '#1db8f3',
                        fontWeight: Fonts.weight.bold
                      }}>{new Date(item.date).toDateString()}</Text>
                    <Text style={{
                      fontSize: Fonts.size.m,
                      fontWeight: Fonts.weight.normal,
                      textTransform: 'uppercase'
                    }}>{item.title}</Text>
                  </View>
                </Pressable>
              );
            }}
            estimatedItemSize={30}
            estimatedListSize={{height: 300, width: Dimensions.get("screen").width}}
            data={newsList}
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

  newsContainer: {
    padding: 1,
  },

  newsImage: {
    height: 250,
  },
});
