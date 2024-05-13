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
    client.brMap().then((res) => {
      console.log('map ->', res)
    });

    client.bannerColors().then((res) => {
      console.log('banner color ->', res)
    });

    client.cosmeticsList().then((res) => {
      console.log('cosmeticsList ->', res)
    });
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
        <TextInput style={{width: '100%'}} placeholder={'Buscar'}>
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
    backgroundColor: '#fbefff'
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
