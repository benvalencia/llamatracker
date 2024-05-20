import {StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React from "react";

export default function NewsDetailScreen({route}: any) {
  const {newsDetail} = route.params;

  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View>
        <Text>body: {newsDetail.body}</Text>
        <Text>hidden: {newsDetail.hidden ? 'true' : 'false'}</Text>
        <Text>id: {newsDetail.id}</Text>
        <Text>image: {newsDetail.image}</Text>
        <Text>sortingPriority: {newsDetail.sortingPriority}</Text>
        <Text>tabTitle: {newsDetail.tabTitle}</Text>
        <Text>titleImage: {newsDetail.titleImage}</Text>
        <Text>title: {newsDetail.title}</Text>
      </View>
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
});
