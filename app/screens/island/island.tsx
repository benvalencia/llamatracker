import {ScrollView, Text, View} from 'react-native';
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import React, {useEffect, useState} from "react";
import {Img} from "@/components/elements/Img";
import {FlashList} from "@shopify/flash-list";

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
        <Img
          source={{uri: mapImage.blank}}
          style={{objectFit: 'cover', height: 400}}
        ></Img>
        <Img
          source={{uri: mapImage.pois}}
          style={{objectFit: 'cover', height: 400}}
        ></Img>
      </View>
      <View style={{gap: 10}}>
        <FlashList
          renderItem={({item}: any) => {
            return (
              <View style={{backgroundColor: 'grey', padding: 10, borderRadius: 10}}>
                <Text>id: {item.id}</Text>
                <Text>x: {item.location.x}</Text>
                <Text>y: {item.location.y}</Text>
                <Text>z: {item.location.z}</Text>
                <Text>name: {item.name}</Text>
              </View>
            );
          }}
          estimatedItemSize={20}
          data={mapPoisPositions}
          collapsable={true}
          horizontal={false}
        />
      </View>
    </ScrollView>
  );
}
