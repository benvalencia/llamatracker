import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function NewsDetailScreen({route}: any) {
  const {bottom} = useSafeAreaInsets()
  // const {width} = useWindowDimensions();

  const {newsDetail} = route.params;

  return (
    <View style={{paddingBottom: bottom, backgroundColor: 'white'}}>
      <Image
        source={{uri: newsDetail.image}}
        style={{objectFit: 'cover', height: 300}}
      ></Image>
      <ScrollView style={{padding: 10, height: '100%'}}>
        <View style={{gap: 15}}>
          <Text style={{fontSize: 15, color: '#1db8f3', fontWeight: 700}}>{newsDetail.date}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 400,
            textTransform: 'uppercase'
          }}>{newsDetail.title == newsDetail.tabTitle ? newsDetail.title : newsDetail.title + ' ' + newsDetail.tabTitle}</Text>
          <Text style={{fontSize: 20, fontWeight: 400}}>{newsDetail.body}</Text>
        </View>
      </ScrollView>
      {/*<Text>author: {newsDetail.author}</Text>*/}
      {/*<Text>cat: {newsDetail.cat}</Text>*/}
      {/*<Text>category: {newsDetail.category}</Text>*/}
      {/*<Text>gridTitle: {newsDetail.gridTitle}</Text>*/}
      {/*<Text>type: {newsDetail._type}</Text>*/}

        {/*CON MÁS CALIDAD*/}
      {/*<Text>shareImage: {newsDetail.shareImage}</Text>*/}


        {/*<Text>content: {newsDetail.content}</Text>*/}

        {/*<RenderHTML*/}
        {/*  contentWidth={width}*/}
        {/*  source={{html: newsDetail.content}}*/}
        {/*/>*/}
      </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
