import {Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";

export default function NewsScreen() {

  const fortniteService = new FortniteService();

  const [newsBattleRoyaleList, setNewsBattleRoyaleList] = useState([] as any[]);
  const [newsSaveTheWorldList, setNewsSaveTheWorldList] = useState([] as any[]);
  const [refreshing, setRefreshing] = useState(false);

  const goToNewsDetail = (news: any) => {
    console.log('news detail -> ', news)
  }

  const getNewsList = async () => {
    // const news = await fortniteService.getNews();
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
        justifyContent: 'center'
      }}>
        {/*NEWS LIST*/}
        <View style={styles.newsListContainer}>
          {newsBattleRoyaleList.map((news, index: number) => {
            return (
              <Pressable style={styles.newsItemContainer} key={index} onPress={() => goToNewsDetail(news.id)}>
                <Text>body: {news.body}</Text>
                <Text>hidden: {news.hidden ? 'true' : 'false'}</Text>
                <Text>id: {news.id}</Text>
                <Text>image: {news.image}</Text>
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
  }
});
