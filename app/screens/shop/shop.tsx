import {StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function ShopScreen() {
  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        Aqui mostraremos lo cambios de la tienda
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
