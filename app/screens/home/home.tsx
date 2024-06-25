import {Animated, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors, Fonts} from "@/constants/Colors";
import React, {useEffect, useMemo, useState} from "react";
import {useNavigation} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useTheme} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {NewsResponseData} from "fnapicom/dist/src/http/autogeneratedEndpointStructs";

import {Img} from "@/components/elements/Img";
import Timer from "@/components/elements/Timer";
import {LocalStoreService} from "@/app/services/localStore/localStore.service";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScrollView = Animated.ScrollView;

export default function HomeScreen() {
  const fortniteService = useMemo(() => new FortniteService(), []);
  const localStoreService = useMemo(() => new LocalStoreService(), []);

  const navigation = useNavigation()
  const {top} = useSafeAreaInsets()
  const {colors} = useTheme();

  const [username, setUsername] = useState('');
  const [recentSearch, setRecentSearch] = useState([] as string[]);
  const [news, setNews] = useState<NewsResponseData | null>(null)

  const nextUpdate = new Date('2024-08-16T08:00:00'); // Fecha y hora de la próxima actualización

  const goToStats = () => {
    if (username === '') return;

    const fortniteUsername = username;

    // RESET USERNAME
    setUsername('');

    storeRecentSearch(fortniteUsername).then(() => {
    });

    // GO TO STATS VIEW
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/profile/stats',
        params: {
          fortniteUsername
        }
      }));
  }
  const goToNews = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/news/news',
      }));
  }

  const clearInput = () => {
    setUsername('')
  }

  const storeRecentSearch = async (username: string) => {
    const isInArray = recentSearch.find((recentUserprofile) => recentUserprofile === username) !== undefined;
    const isArrayFull = recentSearch.length > 6;

    if (isArrayFull) {
      const recentSearchArrayCut = recentSearch.filter((recentUserprofile, index) => index !== 0);
      setRecentSearch(recentSearchArrayCut)
    }

    if (isInArray) {
      const foundInSearch = recentSearch.filter((recentUserprofile, index) => recentUserprofile !== username);
      setRecentSearch(foundInSearch)
    }

    setRecentSearch((recentSearch) => [
      ...recentSearch,
      username,
    ]);

    const objectToStore = Object.assign({}, recentSearch);
    try {
      const jsonValue = JSON.stringify(objectToStore);
      await AsyncStorage.setItem('recent-search', jsonValue);
    } catch (err) {
      // saving error
      console.log(err)
    }
  }

  const getStoreRecentSearch = () => {
    localStoreService.getStore('recent-search').then((res) => {
      const arrayRecentSearch = Object.keys(res as any).map((key) => res ? res[key as any] : null);
      setRecentSearch(arrayRecentSearch);
    })
  };

  const getSeasonInformation = async () => {
    const getCurrentPOI = await fortniteService.getBattlepassRewards();

    const chapterInfo = {
      chapterSeason: getCurrentPOI.displayInfo.chapterSeason,
      begin: getCurrentPOI.seasonDates.begin,
      end: getCurrentPOI.seasonDates.end,
    }
  };

  const getNews = async () => {
    const news = await fortniteService.getNews();
    await getSeasonInformation()

    setNews(news)
  };

  useEffect(() => {
    getNews();
    getStoreRecentSearch()
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={0}
    >
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{alignContent: 'center', paddingTop: top}}>

        <View style={styles.viewContainer}>
          {/* LOGO */}
          <View style={styles.imageContainer}>
            <Img
              source={require('../../../assets/images/logo/icons8-fortnite-llama-144.png')}
              style={styles.logoIcon}
            />
          </View>
          {/* BARRA DE BÚSQUEDA */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputComponent}
              placeholder={'Buscar perfil'}
              placeholderTextColor={'#4b4b4b'}
              onChangeText={(text) => setUsername(text)}
              value={username}
              onSubmitEditing={goToStats}//
            />
            <Pressable style={[styles.searchIconContainer, {display: username.length ? 'none' : 'flex'}]}>
              <Img source={require('../../../assets/images/logo/icons8-fortnite-llama-48.png')}
                   style={styles.searchIcon}/>
            </Pressable>
            <Pressable style={[styles.searchIconContainer, {display: username.length ? 'flex' : 'none'}]}
                       onPress={clearInput}>
              <Ionicons name={'close'} size={Fonts.size.xl}/>
            </Pressable>
          </View>

          {/* RECENT SEARCH PILLS */}
          <View style={styles.recentSearchContainer}>
            {recentSearch.map((item) => {
              return (
                <Pressable style={styles.recentSearchPillContainer} key={item} onPress={() => setUsername(item)}>
                  <Text style={styles.recentSearchPill}>{item}</Text>
                </Pressable>
              );
            })}
          </View>

          {/*NEWS */}
          < View style={styles.newsGiftBanner}>
            <Pressable onPress={goToNews}>
              <Img
                source={[{uri: news?.data.br.image}]}
                style={{height: 210}
                }
              ></Img>
            </Pressable>
          </View>
          {/* TIMER */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerTitle}>Capitulo 5 en...</Text>
            <Timer targetDate={nextUpdate}></Timer>
          </View>

          {/* DONATION */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerTitle}>Ayuda con una potion</Text>
            <Text style={styles.timerText}>0.99£</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // GENERAL CONTAINER
  scrollViewContainer: {
    // backgroundColor: Colors.primary,
  },

  // VIEW CONTAINER
  viewContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    gap: 15,
  },

  // TOP CONTAINER
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },

  // IMAGE
  imageContainer: {},

  //INPUT Y PILLS CONTAINER
  inputContainer: {
    width: '100%',
  },

  inputComponent: {
    height: 50,
    borderRadius: 18,
    paddingLeft: 15,
    fontSize: Fonts.size.m,
    backgroundColor: '#fbefff',
    paddingBottom: 0,
  },

  searchIconContainer: {
    height: '100%',
    padding: 10,
    position: 'absolute',
    alignSelf: 'center',
    right: 5,
    zIndex: 1, // Asegura que el icono esté por encima del input
  },

  logoIcon: {
    width: 95,
    height: 95,
  },

  searchIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.secondary,
  },

  // RECENT SEARCH CONTAINER
  recentSearchContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },

  recentSearchPillContainer: {
    backgroundColor: 'grey',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 7,
    width: 100,
  },
  recentSearchPill: {
    color: 'blue',
    fontSize: Fonts.size.xs,
    fontWeight: Fonts.weight.normal,
    letterSpacing: Fonts.spacing.soft,
    textAlign: 'center'
  },

  // BUTTON
  buttonContainer: {
    width: '100%',
  },
  buttonComponent: {
    width: '100%',
    height: 40,
    borderRadius: 18,
    paddingLeft: 15,
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    width: '100%',
    height: 40,
    lineHeight: 40,
    fontSize: Fonts.size.m,
    color: 'white',
    textAlign: 'center',
  },
  // TIMER CONTAINER
  timerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 18,
    padding: 10,
  },
  timerTitle: {
    fontSize: Fonts.size.m,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  timerText: {
    fontSize: Fonts.size.m,
    fontWeight: Fonts.weight.bold,
    color: 'gray',
  },
  //BANNER GIFT NEWS
  newsGiftBanner: {
    minHeight: 100,
    width: '100%',
    objectFit: 'contain',
    borderRadius: 10,
    overflow: 'hidden'
  },
});
