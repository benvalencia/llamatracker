import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {useEffect, useState} from "react";

export default function IslandScreen() {
  const fortniteService = new FortniteService();
  const [mapImage, setMapImage] = useState({} as any);
  const [mapPoisPositions, setMapPoisPositions] = useState([] as any);

  const getResponse = async () => {
    const currentPOI = await fortniteService.getCurrentPOI();
    const allItemsList = await fortniteService.getAllLootList();

    const map = await fortniteService.getMap();


    setMapImage(map.data.images);
    setMapPoisPositions(map.data.pois)

  };

  useEffect(() => {
    getResponse();
  }, []);


  return (
    <ScrollView style={{
      height: '100%',
    }}>
      <View style={{width: '100%'}}>
        <Image
          source={{uri: mapImage.blank}}
          style={{objectFit: 'cover', height: 400}}
        ></Image>
        <Image
          source={{uri: mapImage.pois}}
          style={{objectFit: 'cover', height: 400}}
        ></Image>
      </View>
      <View style={{gap: 10}}>
        {mapPoisPositions.map((poi: any, index: number) => {
          return (
            <View key={index} style={{backgroundColor: 'grey', padding: 10, borderRadius: 10}}>
              <Text>id: {poi.id}</Text>
              <Text>x: {poi.location.x}</Text>
              <Text>y: {poi.location.y}</Text>
              <Text>z: {poi.location.z}</Text>
              <Text>name: {poi.name}</Text>
            </View>
          )
        })}
      </View>
    </ScrollView>
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
