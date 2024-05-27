import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useState} from "react";



export default function RegisterScreen() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Agregar la lógica para registrar al usuario
    // Por ahora, solo mostraremos un mensaje en la consola
    console.log('Registrando usuario:', username, password);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Registro</Text>
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
    <TextInput
      style={styles.input}
      placeholder="Confirmar contraseña"
      secureTextEntry
      value={confirmPassword}
      onChangeText={setConfirmPassword}
    />
    <Button
      title="Registrarse"
      onPress={handleRegister}
      color={Colors.primary}
    />
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
});
