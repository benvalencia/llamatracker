import {Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function ChallengesScreen() {
  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        Aqui mostraremos las misiones del usuario
      </Text>
    </View>
  );
}
