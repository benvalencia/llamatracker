import {StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {useEffect} from "react";

export default function IslandScreen() {
  const fortniteService = new FortniteService();

  const getResponse = async () => {

    const res = await fortniteService.getShopVoting();

    console.log('res >>> ', res)
  };

  useEffect(() => {
    getResponse();
  }, []);


  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        Aqui mostraremos:
      </Text>
      <Text>
        Armas, Items, Mapa
      </Text>
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
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '80%', // Puedes ajustar el ancho según tu diseño
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
