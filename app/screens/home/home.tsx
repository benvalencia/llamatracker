import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState} from "react";
import {useNavigation} from "expo-router";
import {CommonActions} from "@react-navigation/native";

export default function HomeScreen() {

  const [username, setUsername] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

  const navigation = useNavigation()

  // TODO: hacer aqui la llamda y pasar los datos por parametros
  // TOOD: pensar donde hacer la llama si aqui o en el stats screen
  const goToStats = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/profile/stats',
        params: {
          username
        }
      }));
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.viewContainer}>
        {/*LOGO*/}
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/logo/icons8-fortnite-llama-144.png')}/>
        </View>
        {/*SEARCH PROFILE INPUT */}
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputComponent}
                       placeholder={'Buscar perfil'} placeholderTextColor={'#4b4b4b'}
                       onBlur={() => console.log('test on blur')}
                       onChangeText={(text) => setUsername(text)}
            >
            </TextInput>
          </View>
        </TouchableWithoutFeedback>

        {/*SEARCH PROFILE BUTTON */}
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
    justifyContent: 'center',
    padding: 25,
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
    lineHeight: 30,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
