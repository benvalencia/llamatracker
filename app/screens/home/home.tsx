import {StyleSheet, View, Text, TextInput, Button, Image} from 'react-native';
import {Colors} from "@/constants/Colors";
import React from "react";
import {Client, Language} from "fnapicom";

export default function HomeScreen() {

  const client = new Client({
    language: Language.Spanish,
    apiKey: '2eb358b4-ef78-41ce-aecb-961725393619',
  });

  const searchProfile = () => {

    client.brStats({
      name: "TheWaxMell",
      accountType: 'xbl',
      timeWindow: 'season',
      image: 'all',
    }).then((res) => {
      console.log('brStats -> ', res)
    }).catch((err) => {
      console.log('err -> ', err)
    });

    // client.brMap().then((res) => {
    //   console.log('brMap -> ', res)
    // }).catch((err) => {
    //   console.log('err -> ',err)
    // });
  }

  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/images/logo/icons8-fortnite-llama-144.png')}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputComponent} placeholder={'Buscar'} placeholderTextColor={'#4b4b4b'}>
        </TextInput>
      </View>

      <View>
        <Button onPress={searchProfile} title={'Buscar'}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  imageContainer: {
    marginBottom: 20
  },

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

  tinyLogo: {},
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
