import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function NewsDetailScreen({route}: any) {
  const {bottom} = useSafeAreaInsets()
  // const {width} = useWindowDimensions();

  const {newsDetail} = route.params;

  // console.log('newsDetail >> ',newsDetail)
  return (
    <ScrollView style={{
      backgroundColor: Colors.primary,
      height: '100%',
      paddingBottom: bottom,
    }}>
      <View style={{paddingBottom: bottom}}>
        <Text>author: {newsDetail.author}</Text>
        <Text>cat: {newsDetail.cat}</Text>
        <Text>category: {newsDetail.category}</Text>
        <Text>date: {newsDetail.date}</Text>
        <Text>title: {newsDetail.title}</Text>
        <Text>gridTitle: {newsDetail.gridTitle}</Text>
        <Text>type: {newsDetail._type}</Text>
        <Text>image: {newsDetail.image}</Text>
        {/*CON MÁS CALIDAD*/}
        <Text>shareImage: {newsDetail.shareImage}</Text>


        {/*<Text>content: {newsDetail.content}</Text>*/}

        {/*<RenderHTML*/}
        {/*  contentWidth={width}*/}
        {/*  source={{html: newsDetail.content}}*/}
        {/*/>*/}
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
});
