import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {NewsResponseData} from "fnapicom/dist/src/http/autogeneratedEndpointStructs";
import ScrollView = Animated.ScrollView;

export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;

  const fortniteService = new FortniteService();

  const navigation = useNavigation()
  const {top} = useSafeAreaInsets()

  const [username, setUsername] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [recentSearch, setRecentSearch] = useState([] as string[]);
  const [news, setNews] = useState<NewsResponseData | null>(null)

  const goToStats = () => {
    if (username === '') return;

    const fortniteUsername = username;

    // RESET USERNAME
    setUsername('');

    storeRecentSearch(fortniteUsername);

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

  const storeRecentSearch = async (username: string) => {
    const isInArray = recentSearch.find((recentUserprofile) => recentUserprofile === username) !== undefined;
    const isArrayFull = recentSearch.length > 3;

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

  const getStoreRecentSearch = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('recent-search');
      const objToTransform = jsonValue != null ? JSON.parse(jsonValue) : null;
      const arrayRecentSearch = Object.keys(objToTransform as any).map((key) => objToTransform ? objToTransform[key as any] : null);
      setRecentSearch(arrayRecentSearch);
    } catch (err) {
      // error reading value
      console.log(err)
    }
  };

  const getNews = async () => {
    const news = await fortniteService.getNews();
    setNews(news)
  };

  useEffect(() => {
    const updateCountdown = () => {
      const nextUpdate = new Date('2024-08-16T08:00:00'); // Fecha y hora de la próxima actualización
      const now = new Date();
      const difference = nextUpdate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(`${days} días ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} `);
      } else {
        setTimeRemaining('¡La actualización ha llegado!');
      }
    };

    getNews();
    getStoreRecentSearch()
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={0}
    >
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{alignContent: 'center', paddingTop: top}}>

        <View style={styles.viewContainer}>

          {/* LOGO Y BARRA DE BÚSQUEDA */}
          <View style={styles.topContainer}>

            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/logo/icons8-fortnite-llama-48.png')}/>
            </View>

            {/* Contenedor para el input y las pills */}
            <View style={styles.inputPillsContainer}>
              {/* Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputComponent}
                  placeholder={'Buscar perfil'}
                  placeholderTextColor={'#4b4b4b'}
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  onSubmitEditing={goToStats}//
                />
                <Pressable style={styles.searchIconContainer} onPress={goToStats}>
                  <Image source={require('../../../assets/images/logo/icons8-fortnite-llama-48.png')}
                         style={styles.searchIcon}/>
                </Pressable>
              </View>

              {/* Recent Search Pills */}
              <View style={styles.recentSearchContainer}>
                {recentSearch.map((item) => {
                  return (
                    <Pressable style={styles.recentSearchPillContainer} key={item} onPress={() => setUsername(item)}>
                      <Text style={styles.recentSearchPill}>{item}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          {/*NEWS */}
          < View style={styles.newsGiftBanner}>
            <Pressable onPress={goToNews}>
              <Image
                source={{uri: news?.data.br.image}}
                style={{width: 325, height: 185,}}
              ></Image>
            </Pressable>
          </View>
          {/* TIMER */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerTitle}>Capitulo 5 en...</Text>
            <Text style={styles.timerText}>{timeRemaining}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // GENERAL CONTAINER
  scrollViewContainer: {
    backgroundColor: Colors.primary,
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
  inputPillsContainer: {
    display: 'flex',
    width: 'auto',
    flexGrow: 1,
  },

  inputContainer: {},

  inputComponent: {
    height: 50,
    borderRadius: 18,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: '#fbefff',
    paddingBottom: 0,
  },

  searchIconContainer: {
    padding: 10,
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{translateY: -22}], // Ajusta el posicionamiento vertical
    zIndex: 1, // Asegura que el icono esté por encima del input
  },

  searchIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.secondary,
  },

  // RECENT SEARCH CONTAINER
  recentSearchContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingTop: 5,
    flexWrap: 'wrap',
    width: '100%',
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
    fontWeight: '400',
    letterSpacing: -1,
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
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  //BANNER GIFT NEWS
  newsGiftBanner: {
    minHeight: 100,
    width: 325,
    height: 185,
  },
});
