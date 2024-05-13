import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState} from "react";
import {Client, Language} from "fnapicom";
import {useNavigation} from "expo-router";
import {CommonActions} from "@react-navigation/native";

export default function HomeScreen() {

  const [username, setUsername] = useState('');


  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

  const navigation = useNavigation()


  const client = new Client({
    language: Language.Spanish,
    apiKey: '2eb358b4-ef78-41ce-aecb-961725393619',
  });

  const goToStats = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/profile/stats',
        params: {
          username
        }

      }));
  }

  // const searchProfile = () => {
  // client.brStats({
  //   name: "TheWaxMell",
  //   accountType: 'xbl',
  //   timeWindow: 'season',
  //   image: 'all',
  // }).then((res) => {
  //   console.log('brStats -> ', res)
  // }).catch((err) => {
  //   console.log('err -> ', err)
  // });
    // client.brMap().then((res) => {
    //   console.log('brMap -> ', res)
    // }).catch((err) => {
    //   console.log('err -> ',err)
    // });
  // }

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.viewContainer}>

        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/logo/icons8-fortnite-llama-144.png')}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputComponent}
                     placeholder={'Buscar perfil'} placeholderTextColor={'#4b4b4b'}
                     onChangeText={(text) => setUsername(text)}
          >
          </TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonComponent} onPress={goToStats}>
            <Text style={styles.buttonText}>{'Buscar'}</Text>
          </Pressable>
        </View>

      </View>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  // GENERAL CONTAINER
  viewContainer: {
    backgroundColor: Colors.primary,
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // IMAGE
  imageContainer: {
    marginBottom: 20
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
    height: 30,
    borderRadius: 13,
    paddingLeft: 15,
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    width: '100%',
    height: 30,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
