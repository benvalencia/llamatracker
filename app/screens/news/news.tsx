import {Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {CommonActions} from "@react-navigation/native";
import {useNavigation} from "expo-router";

export default function NewsScreen() {

  const fortniteService = new FortniteService();
  const navigation = useNavigation()

  const [newsBattleRoyaleList, setNewsBattleRoyaleList] = useState([] as any[]);
  const [newsSaveTheWorldList, setNewsSaveTheWorldList] = useState([] as any[]);
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                        style={styles.scrollReloadContainer}/>}>
      <View style={{
        backgroundColor: Colors.primary,
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'}}
      > {/*NEWS LIST*/}
        <View style={styles.newsContainer}>
          <Text style={styles.sectionTitle}>Battle Royale News</Text>
               {newsBattleRoyaleList.map((news, index: number) => {
            return (
              <Pressable style={styles.newsItemContainer} key={index} onPress={() => goToNewsDetail(news)}>
                <View style={styles.titleContainer}>
                   <Text style={styles.sectionTitle}>{news.body}</Text>
                </View>  
                <View style={styles.newsImage}>
                 <Image style={styles.newsImage}
                   source={{uri: news.image}}/>
                </View>  
                    <View style={styles.textContainer}>
                      <Text style={styles.sectionTitle}>texto</Text>

                    </View>
                
                <Text>sortingPriority: {news.sortingPriority}</Text>
                <Text>tabTitle: {news.tabTitle}</Text>
                <Text>titleImage: {news.titleImage}</Text>
                <Text>title: {news.title}</Text>
              </Pressable>
            )
          })}
          {newsSaveTheWorldList.map((news, index) => {
            console.log(news)
            return (
              <Pressable style={styles.newsItemContainer} key={index} onPress={() => goToNewsDetail(news)}>
                <Text>body: {news.body}</Text>
                <Text>image: {news.image}</Text>
                <Image
                  source={{uri: news.image}}
                  style={{width: 640, height: 305}}/>
                <Text>title: {news.title}</Text>
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
  newsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  
  sectionTitle: {
    paddingTop: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 10,
  },
  newsItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  newsImage: {
    alignContent:'center',
    marginRight: 10,
    justifyContent: 'center',
    width: 410, 
    height: 260,
    alignSelf: 'center', // Centrar horizontalmente
    resizeMode: 'cover'
  },
  newsTitle: {
    fontSize: 16,
    color: Colors.yellow,
  },
  
  // NEWS LIST CONTAINER
  newsListContainer: {
    backgroundColor: 'red',
    gap: 5,
  },

  // NEWS ITEMS CONTAINER
  newsItemContainer: {
    backgroundColor: 'blue',
  },
  newsItemComponent: {
    backgroundColor: 'pink',
  },
  titleContainer: {
    width: '100%',
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  }
});
