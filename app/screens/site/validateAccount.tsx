import {Button, KeyboardAvoidingView, Platform, Text, TextInput, View} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function ValidateAccountScreen() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}
    >

      <View style={{
        height: '100%',
        backgroundColor: Colors.primary,

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View>

        </View>
        <Text>
          imagen
        </Text>
        <TextInput placeholder={'Buscar'}>
        </TextInput>
        <Button title={'Buscar'}></Button>
      </View>

    </KeyboardAvoidingView>
  );
}
