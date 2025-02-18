import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, TextInput, StyleSheet, View } from "react-native";
import { useTokenContext } from "../../../src/contexts/userContext";
import api from "../../../src/services/api";
import { Car } from "../../../src/types/Car";

export default function UpdateCar() {
  const { id } = useLocalSearchParams(); // Obtém o ID da URL
  const { token } = useTokenContext();
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  useEffect(() => {
    console.log("Car ID:", id); // Verificar se o ID está correto
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
        Alert.alert("Error", "Failed to fetch car data.");
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
        Alert.alert("Success", "Car updated successfully");
        router.push("/userspace"); // Redireciona após a atualização
      })
      .catch(() => {
        Alert.alert("Error", "Failed to update car.");
      });
  };

  const handleDelete = () => {
    api
      .delete(`/api/collections/cars/records/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        Alert.alert("Success", "Car deleted successfully");
        router.push("/userspace"); // Redireciona após a exclusão
      })
      .catch(() => {
        Alert.alert("Error", "Failed to delete car.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={brand}
        onChangeText={setBrand}
        placeholder="Brand"
        style={styles.input}
      />
      <TextInput
        value={model}
        onChangeText={setModel}
        placeholder="Model"
        style={styles.input}
      />
      <TextInput
        value={hp}
        onChangeText={setHp}
        placeholder="HP"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Update Car" onPress={handleUpdate} />
      <Button title="Delete Car" onPress={handleDelete} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
