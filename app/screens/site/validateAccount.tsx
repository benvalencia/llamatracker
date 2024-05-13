import {StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView, Platform} from 'react-native';
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
