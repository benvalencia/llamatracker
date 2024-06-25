import {ScrollView, Text, View} from 'react-native';
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import React, {useEffect, useState} from "react";
import {Img} from "@/components/elements/Img";
import {FlashList} from "@shopify/flash-list";
import {Loader} from "@/components/elements/Loader";
import {Fonts} from "@/constants/Colors";
import {useTheme} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function IslandScreen() {
  const {colors} = useTheme();
  const {top, bottom} = useSafeAreaInsets()

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
    <View style={{
      paddingTop: top,
      marginBottom: bottom,
      height: '100%'
    }}>

      {mapPoisPositions[0] == undefined ?
        <View style={{position: 'absolute', top: '40%', width: '100%'}}>
          <Loader></Loader>
        </View>
        : null}

      {mapPoisPositions[0] ?
        <View style={{marginBottom: 5, alignItems: 'center'}}>
          <Text style={{
            color: colors.text,
            fontSize: Fonts.size.xl,
            fontWeight: Fonts.weight.bold
          }}>Island</Text>
        </View>
        : null
      }

      <ScrollView>
        <View style={{width: '100%', display: !mapPoisPositions[0] ? 'none' : 'flex'}}>
          <Img
            source={{uri: mapImage.blank}}
            style={{objectFit: 'cover', height: 400, display: 'none'}}
          ></Img>
          <Img
            source={{uri: mapImage.pois}}
            style={{objectFit: 'cover', height: 400}}
          ></Img>
        </View>
        <View style={{
          minHeight: 300
        }}>
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
    </View>
  );
}
