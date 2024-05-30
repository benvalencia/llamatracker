import {StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function ItemDetailScreen({route}: any) {
  // const {fortniteUsername} = route.params;


  // console.log('items.description >>> ', shopRaw.data.featured.entries[10].items[0].description)
  // console.log('items.images.icon >>> ', shopRaw.data.featured.entries[10].items[0].images.icon)
  // console.log('items.images.lego.small >>> ', shopRaw.data.featured.entries[10].items[0].images.lego.small)
  // console.log('items.images.lego.wide >>> ', shopRaw.data.featured.entries[10].items[0].images.lego.wide)

  // console.log('items.images.other >>> ', shopRaw.data.featured.entries[10].items[0].images.other)
  // console.log('items.images.smallIcon >>> ', shopRaw.data.featured.entries[10].items[0].images.smallIcon)
  // console.log('items.introduction.chapter >>> ', shopRaw.data.featured.entries[10].items[0].introduction.chapter)
  // console.log('items.introduction.season >>> ', shopRaw.data.featured.entries[10].items[0].introduction.season)
  // console.log('items.introduction.text >>> ', shopRaw.data.featured.entries[10].items[0].introduction.text)
  // console.log('items.metaTags >>> ', shopRaw.data.featured.entries[10].items[0].metaTags)
  // console.log('items.name >>> ', shopRaw.data.featured.entries[10].items[0].name)
  // console.log('items.rarity.value >>> ', shopRaw.data.featured.entries[10].items[0].rarity.value)
  // console.log('items.rarity.displayValue >>> ', shopRaw.data.featured.entries[10].items[0].rarity.displayValue)
  //
  // console.log('items.set.text >>> ', shopRaw.data.featured.entries[10].items[0].set.text)
  // console.log('items.other >>> ', shopRaw.data.featured.entries[10].items[0].set.value)
  // console.log('items.shopHistory >>> ', shopRaw.data.featured.entries[10].items[0].shopHistory)
  //
  // console.log('items.type.displayValue >>> ', shopRaw.data.featured.entries[10].items[0].type.displayValue)
  // console.log('items.type.value >>> ', shopRaw.data.featured.entries[10].items[0].type.value)
  //
  // console.log('items.variants >>> ', shopRaw.data.featured.entries[10].items[0].variants)

  // console.log('producto.newDisplayAsset.materialInstances.images.Background = imagen del paquete >>> ', getShopCombined.data.featured.entries[0].newDisplayAsset.materialInstances[0].images.Background) // para pintar la imagen del paquete

  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        Aqui mostraremos el detalle de un item de la tienda
      </Text>
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
