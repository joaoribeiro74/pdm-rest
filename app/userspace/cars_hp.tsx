import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function CarsHp() {
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    api
      .get("/api/collections/cars/records?filter=hp>300", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCars(response.data.items);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to fetch potent cars.");
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Potent Cars (HP > 300)</Text>
      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.brand}</Text>
            <Text>{item.model}</Text>
            <Text>{item.hp} HP</Text>
          </View>
        )}
        keyExtractor={(car) => car.id || ""}
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flatlist: {
    marginTop: 16,
  },
  item: {
    marginBottom: 12,
  },
});
