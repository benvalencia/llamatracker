import {Animated, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState, useEffect} from "react";
import {useNavigation} from "expo-router";
import {CommonActions} from "@react-navigation/native";
import ScrollView = Animated.ScrollView;
import { Ionicons } from '@expo/vector-icons';

// Agregar estilos al temporizador
const timerStyle = StyleSheet.create({
  timerContainer: {
    marginTop: 10,
    alignItems: 'center', // Centra el temporizador horizontalmente
    backgroundColor: 'yellow', // Color de fondo amarillo
    borderRadius: 18, // Radio del borde de 18
    padding: 10, // Añadir un relleno de 10 puntos
  },
  timerTitle: {
    fontSize: 20, // Tamaño de fuente del título
    fontWeight: 'bold', // Texto en negrita
    marginBottom: 10, // Espacio inferior de 10 puntos
    color: 'gray', // Color del texto
  },
  timerText: {
    fontSize: 24, // Tamaño de fuente más grande
    fontWeight: 'bold', // Texto en negrita
    color: 'gray', // Color del texto
  },
});

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

     //GO TO SHOP
      const goToShop = () => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'screens/shop',
          })
        );
      };
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

         {/* BOTÓN TIENDA */}
          <TouchableOpacity style={styles.shopButton} onPress={goToStats}>
          <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>

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
            </Pressable>

            {/* TIMER */}
          <View style={timerStyle.timerContainer}>
            <Text style={timerStyle.timerTitle}>Capitulo 5 en...</Text>
            <Text style={timerStyle.timerText}>{timeRemaining}</Text>
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

  // SHOP BUTTON
  shopButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: Colors.secondary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeButtonText: {
    color: 'white',
    fontSize: 12,
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
