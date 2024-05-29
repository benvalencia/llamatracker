import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState} from "react";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Agregar la lógica para iniciar sesion
    // Por ahora, solo mostraremos un mensaje en la consola
    console.log("Iniciando usuario:", username, password);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable

        onPress={handleLogin}
        style={{
          backgroundColor: Colors.primary,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: "white"}}>Iniciar Sesión</Text>

      </Pressable>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    width: '80%',
  }
});
