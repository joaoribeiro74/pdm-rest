import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, TextInput, StyleSheet, View, Text } from "react-native";
import { useTokenContext } from "../../../src/contexts/userContext";
import api from "../../../src/services/api";
import { Car } from "../../../src/types/Car";
import DefaultButton from "@/components/DefaultButton";
import ActionButton from "@/components/ActionButton";

export default function UpdateCar() {
  const { id } = useLocalSearchParams(); // Obtém o ID da URL
  const { token } = useTokenContext();
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  useEffect(() => {
  if (!id) {
    Alert.alert("Error", "Car ID is missing.");
    return;
  }

    api
      .get(`/api/collections/cars/records/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const carData = response.data;
        setBrand(carData.brand);
        setModel(carData.model);
        setHp(carData.hp ? String(carData.hp) : "");
      })
      .catch((error) => {
        console.error("Fetch Error:", error.response?.data || error.message);
        Alert.alert("Erro", "Falha ao buscar dados do carro.");
      });
  }, [id]);

  const handleUpdate = () => {
    api
      .patch(
        `/api/collections/cars/records/${id}`,
        { brand, model, hp: parseInt(hp, 10) || 0 },
        { headers: { Authorization: token } }
      )
      .then(() => {
        Alert.alert("Successo", "Carro atualizado com sucesso!");
        router.push("/userspace"); 
      })
      .catch(() => {
        Alert.alert("Erro", "Falha ao atualizar o carro.");
      });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Atualizar Carro",
        }}
      />
      <Text style={styles.titleInput}>Marca:</Text>
      <TextInput
        value={brand}
        onChangeText={setBrand}
        placeholder="Brand"
        style={styles.input}
        placeholderTextColor="#dedede"
      />
      <Text style={styles.titleInput}>Modelo:</Text>
      <TextInput
        value={model}
        onChangeText={setModel}
        placeholder="Model"
        style={styles.input}
        placeholderTextColor="#dedede"
      />

      <Text style={styles.titleInput}>HP (Potência):</Text>
      <TextInput
        value={hp}
        onChangeText={(text) => setHp(text.replace(/[^0-9]/g, ""))}
        placeholder="HP"
        keyboardType="number-pad"
        style={styles.input}
        placeholderTextColor="#dedede"
      />

      <View style={styles.actionButton}>
        <ActionButton
          title="Editar Carro"
          onPress={handleUpdate}
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
  titleInput: {
    color: "#dedede",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButton: {
    alignItems: "center"
  },
});
