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
      <View style={styles.newsContainer}>
        {/* Título de la sección de noticias */}
        <Text style={styles.sectionTitle}>FORTNITE NEWS</Text>
        {/* Mapear cada noticia de Battle Royale */}
        {newsBattleRoyaleList.map((news, index) => (
          <Pressable style={styles.newsItemContainer} key={index} onPress={() => goToNewsDetail(news)}>

            {/* Contenedor de la imagen */}
            <View style={styles.imageContainer}>
              <Image
                source={{uri: news.image}}
                style={styles.newsImage}
              />
              {/* Superposición de texto sobre la imagen */}
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{news.title}</Text>
                <Text style={styles.overlayText}>{news.body}</Text>
              </View>
            </View>
          </Pressable>
        ))}
        {/* Mapear cada noticia de Save the World */}
        {newsSaveTheWorldList.map((news, index) => (
          <Pressable style={styles.newsItemContainer} key={index} onPress={() => goToNewsDetail(news)}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: news.image}}
                style={styles.newsImage}
              />
              {/* Superposición de texto sobre la imagen */}
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{news.title}</Text>
                <Text style={styles.overlayText}>{news.body}</Text>
              </View>
            </View>
          </Pressable>
        ))}
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

  sectionTitle: {
    textAlign: 'center', // Alinear horizontalmente
    textAlignVertical: 'center', // Alinear verticalmente
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
    justifyContent: 'center',
    alignContent: 'center',
    width: 410,
    height: 260,

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.yellow,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
});
