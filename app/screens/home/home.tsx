import {Animated, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from "@react-navigation/native";
import ScrollView = Animated.ScrollView;


export default function HomeScreen() {

  const navigation = useNavigation()

  const [username, setUsername] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [recentSearch, setRecentSearch] = useState([] as string[]);


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

  const storeRecentSearch = async (username: string) => {
    const isInArray = recentSearch.find((recentUserprofile) => recentUserprofile === username) !== undefined;
    const isArrayFull = recentSearch.length > 4;

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

  useEffect(() => {
    const updateCountdown = () => {
      const nextUpdate = new Date('2024-05-24T08:00:00'); // Fecha y hora de la próxima actualización
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
                  contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.viewContainer}>

          {/*LOGO*/}
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/images/logo/icons8-fortnite-llama-144.png')}/>
          </View>

          {/*SEARCH PROFILE INPUT */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputComponent}
                       placeholder={'Buscar perfil'} placeholderTextColor={'#4b4b4b'}
                       onChangeText={(text) => setUsername(text)}
                       value={username}>
            </TextInput>
          </View>
          {/*RECENT SEARCH PILLS*/}
          <View style={styles.recentSearchContainer}>
            {recentSearch.map((item) => {
              return (
                <Pressable style={styles.recentSearchPillContainer} onPress={() => setUsername(item)}>
                  <Text style={styles.recentSearchPill}>{item}</Text>
                </Pressable>
              )
            })}
          </View>

          {/*SEARCH PROFILE BUTTON */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonComponent} onPress={goToStats}>
              <Text style={styles.buttonText}>{'Buscar'}</Text>
            </Pressable>
          </View>

          {/*NEWS */}
          <View>
            <Text>Aquí las noticias</Text>
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
    flex: 1,
    backgroundColor: Colors.primary,
  },

  // VIEW CONTAINER
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    gap: 15,
  },

  // IMAGE
  imageContainer: {
    alignContent: 'center',
  },

  // INPUT
  inputContainer: {
    width: '100%',
    height: 50,
    borderRadius: 18,
  },
  inputComponent: {
    height: 50,
    borderRadius: 18,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: '#fbefff',
  },

  // RECENT SEARCH CONTAINER
  recentSearchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center'
  },
  recentSearchPillContainer: {
    backgroundColor: 'grey',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 20,
  },
  recentSearchPill: {
    color: 'blue'
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
    verticalAlign: 'middle',
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
});
