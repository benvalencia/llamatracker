import {Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function SettingsScreen() {
  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        Aquí mostraremos las Settings (ajustes)
      </Text>
    </View>
  );
}
