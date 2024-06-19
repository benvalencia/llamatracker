import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import RenderHTML from "react-native-render-html";
import {useTheme} from "@react-navigation/native";
import {Img} from "@/components/elements/Img";
import {Fonts} from "@/constants/Colors";
// import { WebView } from 'react-native-webview';

export default function NewsDetailScreen({route}: any) {
  const {colors} = useTheme();
  const {bottom} = useSafeAreaInsets()
  const {width} = useWindowDimensions();

  const {newsDetail} = route.params;

  const tagsStyles = {
    span: {
      color: colors.text,
      fontSize: Fonts.size.s,
    },
    p: {
      color: colors.text,
      fontSize: Fonts.size.s,
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
      <Img
        source={{uri: newsDetail.image}}
        style={{objectFit: 'fill', height: 200, top: 0}}
      ></Img>
      <ScrollView style={{padding: 10}}>
        <View style={{gap: 15, paddingBottom: bottom}}>
          <Text
            style={{
              fontSize: Fonts.size.m,
              color: '#1db8f3',
              fontWeight: Fonts.weight.bold
            }}>{new Date(newsDetail.date).toDateString()}</Text>
          <Text style={{
            fontSize: Fonts.size.m,
            fontWeight: Fonts.weight.bold,
            textTransform: 'uppercase',
            color: colors.text
          }}>{newsDetail.title === newsDetail.tabTitle ? newsDetail.title : newsDetail.title + ' ' + newsDetail.tabTitle}</Text>

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
            : <Text style={{
              fontSize: Fonts.size.m,
              fontWeight: Fonts.weight.normal,
              color: colors.text
            }}>{newsDetail.body}</Text>}

        </View>
      </ScrollView>

        {/*CON MÁS CALIDAD*/}
      {/*<Text>shareImage: {newsDetail.shareImage}</Text>*/}
    </View>
  );
}
