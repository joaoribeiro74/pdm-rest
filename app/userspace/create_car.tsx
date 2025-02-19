import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";
import ActionButton from "@/components/ActionButton";

export default function CreateCar() {
  const router = useRouter();
  const { token } = useTokenContext();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  const handleCreate = async () => {
    if (!brand || !model || !hp) {
      Alert.alert("Atenção", "Preencha todos os campos antes de continuar.");
      return;
    }

    const data = {
      model,
      brand,
      hp: parseInt(hp),
    };

    const createdCar = await api.post<Car>(
      "/api/collections/cars/records",
      data,
      {
        headers: {
          Authorization: token,
          "content-type": "application/json",
        },
      }
    );

    if (createdCar.status === 200) {
      Alert.alert("Criado!", createdCar.data.model);
      router.replace("/userspace");
    } else {
      console.log(createdCar);
      Alert.alert("Erro!", "Erro ao criar carro!");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
              options={{
                title: "Criar Carro",
              }}
            />
      <TextInput 
        value={brand} 
        onChangeText={setBrand} 
        placeholder="Marca" 
        style={styles.input}
        placeholderTextColor="#dedede"
      />
      <TextInput 
        value={model} 
        onChangeText={setModel} 
        placeholder="Modelo" 
        style={styles.input}
        placeholderTextColor="#dedede"
      />
      <TextInput
        value={hp}
        onChangeText={(text) => setHp(text.replace(/[^0-9]/g, ""))}
        placeholder="HP (Potência)"
        keyboardType="number-pad"
        style={styles.input}
        placeholderTextColor="#dedede"
      />

      <View style={styles.actionButton}>
        <ActionButton
          title="Criar Carro"
          onPress={handleCreate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1c1c1c",
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 16 
  },
  actionButton: {
    alignItems: "center",
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderColor: "#dedede",
    borderWidth: 2,
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "#323232",
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    color: '#dedede',
    marginBottom: 20,
    marginTop: 5,
  },
});
