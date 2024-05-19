import {Animated, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState, useEffect} from "react";
import {useNavigation} from "expo-router";
import {CommonActions} from "@react-navigation/native";
import ScrollView = Animated.ScrollView;

export default function HomeScreen() {

  const [username, setUsername] = useState('');
  const [timeRemaining,setTimeRemaining] = useState('');

  const navigation = useNavigation()

  const goToStats = () => {
    if (username === '') return;

    const fortniteUsername = username;

    // RESET USERNAME
    setUsername('');

    // GO TO STATS VIEW
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/profile/stats',
        params: {
          fortniteUsername
        }
      }));
  }


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
        setTimeRemaining(`${days}D ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining('¡La actualización ha llegado!');
      }
    };

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

          {/*SEARCH PROFILE BUTTON */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonComponent} onPress={goToStats}>
              <Text style={styles.buttonText}>{'Buscar'}</Text>
            </Pressable>

            {/* TIMER */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timeRemaining}</Text>
          </View>


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
  },

  // IMAGE
  imageContainer: {
    marginBottom: 20,
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
  // BUTTON
  buttonContainer: {
    width: '100%',
    marginTop: 10,
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
  // TIMER
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 18,
    color: 'white',
  },  
});
