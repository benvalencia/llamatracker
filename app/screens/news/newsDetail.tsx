import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import RenderHTML from "react-native-render-html";
import {useTheme} from "@react-navigation/native";
// import { WebView } from 'react-native-webview';

export default function NewsDetailScreen({route}: any) {
  const {colors} = useTheme();
  const {bottom} = useSafeAreaInsets()
  const {width} = useWindowDimensions();

  const {newsDetail} = route.params;

  const tagsStyles = {
    span: {
      color: colors.text,
      fontSize: 16,
    },
    p: {
      color: colors.text,
      fontSize: 16,
    },
    ul: {
      color: colors.text,
    },
    ol: {
      color: colors.text,
    },
    li: {
      color: colors.text,
    }
  };

  return (
    <View style={{paddingBottom: bottom + 165}}>
      <Image
        source={{uri: newsDetail.image}}
        style={{objectFit: 'cover', height: 200}}
      ></Image>
      <ScrollView style={{padding: 10}}>
        <View style={{gap: 15, paddingBottom: bottom}}>
          <Text
            style={{fontSize: 15, color: '#1db8f3', fontWeight: 700}}>{new Date(newsDetail.date).toDateString()}</Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 400,
            textTransform: 'uppercase',
            color: colors.text
          }}>{newsDetail.title == newsDetail.tabTitle ? newsDetail.title : newsDetail.title + ' ' + newsDetail.tabTitle}</Text>

          {newsDetail.author
            ? <Text style={{
              color: colors.text
            }}>Autor: {newsDetail.author}</Text>
            : null}
          {newsDetail.category
            ? newsDetail.category.map((categoria: any, index: number) => {
              return (
                <Text style={{
                  color: colors.text
                }} key={index}>{categoria}</Text>
              )
            })
            : null}

          {newsDetail.content
            ? <RenderHTML
              contentWidth={width}
              source={{html: newsDetail.content}}
              ignoredDomTags={['iframe']}
              emSize={2}
              tagsStyles={tagsStyles}
            />
            : <Text style={{fontSize: 20, fontWeight: 400, color: colors.text}}>{newsDetail.body}</Text>}

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
