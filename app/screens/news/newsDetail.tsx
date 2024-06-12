import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import RenderHTML from "react-native-render-html";
// import { WebView } from 'react-native-webview';

export default function NewsDetailScreen({route}: any) {
  const {bottom} = useSafeAreaInsets()
  // const {width} = useWindowDimensions();

  const {newsDetail} = route.params;

  return (
    <View style={{paddingBottom: bottom, backgroundColor: 'white'}}>
      <Image
        source={{uri: newsDetail.image}}
        style={{objectFit: 'cover', height: 200}}
      ></Image>
      <ScrollView style={{padding: 10, height: '100%'}}>
        <View style={{gap: 15}}>
          <Text
            style={{fontSize: 15, color: '#1db8f3', fontWeight: 700}}>{new Date(newsDetail.date).toDateString()}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 400,
            textTransform: 'uppercase'
          }}>{newsDetail.title == newsDetail.tabTitle ? newsDetail.title : newsDetail.title + ' ' + newsDetail.tabTitle}</Text>

          {newsDetail.author
            ? <Text>Autor: {newsDetail.author}</Text>
            : null}
          {newsDetail.category
            ? newsDetail.category.map((categoria: any) => {
              return (
                <Text>{categoria}</Text>
              )
            })
            : null}

          {newsDetail.content
            ? <RenderHTML
              contentWidth={350}
              source={{html: newsDetail.content}}
              ignoredDomTags={['iframe']}
            />
            : <Text style={{fontSize: 20, fontWeight: 400}}>{newsDetail.body}</Text>}

        </View>
      </ScrollView>

        {/*CON MÁS CALIDAD*/}
      {/*<Text>shareImage: {newsDetail.shareImage}</Text>*/}
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
