import { Redirect } from "expo-router";
import { Alert, Text, View, StyleSheet, TextInput } from "react-native";
import { useTokenContext } from "../src/contexts/userContext";
import LoginButton from "@/components/LoginButton";
import { useState } from "react";

export default function Login() {
  const { token } = useTokenContext();
  const [email, setEmail] = useState("fulano@example.com");
  const [password, setPassword] = useState("pdm123pdm");


  if (token) return <Redirect href="/userspace" />;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>
            Bem-Vindo, {"\n"}
          </Text>
          <Text style={styles.subtitle}>faça login para continuar</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#dedede"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#dedede"
          />
          
          <View style={styles.buttonContainer}>
            <LoginButton
              title="Login"
              href="/userspace"
              email={email}
              password={password}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c'
  },
  form: {
    width: '80%',
    padding: 20,
    backgroundColor: "#323232",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "flex-start",
    gap: 20,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: "#dedede",
    boxShadow: '4px 4px #dedede',
  },
  title: {
    color: '#dedede',
    fontWeight: "900",
    fontSize: 20,
  },
  subtitle: {
    color: '#dedede',
    fontWeight: "600",
    fontSize: 15,
    marginTop: -15,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderColor: "#dedede",
    borderWidth: 2,
    boxShadow: "4px 4px #dedede",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "#323232",
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    color: '#dedede'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', // Centraliza o botão
    marginTop: 20,
  },
});