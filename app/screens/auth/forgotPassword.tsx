import {Button, Text, TextInput, View} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function ForgotPasswordScreen() {
  return (
    <View style={{
      backgroundColor: Colors.primary,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        imagen
      </Text>
      <TextInput placeholder={'Buscar'}>
      </TextInput>
      <Button title={'Buscar'}></Button>
    </View>
  );
}
