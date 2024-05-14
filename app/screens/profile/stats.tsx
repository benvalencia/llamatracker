import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Colors} from "@/constants/Colors";
import {Client, Language} from "fnapicom";

export default function StatsScreen() {


  const client = new Client({
    language: Language.Spanish,
    apiKey: '2eb358b4-ef78-41ce-aecb-961725393619',
  });

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
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        imagen
      </Text>
      <TextInput placeholder={'Buscar'}>
      </TextInput>
      <Button title={'Buscar'}></Button>
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
