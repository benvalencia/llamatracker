import {Image, ScrollView, Text, View} from 'react-native';
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
