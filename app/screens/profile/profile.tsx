import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useNavigation} from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.button}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text>Iniciar Sesión</Text>
        </Pressable>
      </View>
      <View style={styles.button}>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 15,
  },
  title: {

    alignContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    marginBottom: 16,
  },

});
