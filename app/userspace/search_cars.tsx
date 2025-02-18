import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function SearchCars() {
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm) {
      api
        .get(`/api/collections/cars/records?filter=brand='${searchTerm}'`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCars(response.data.items);
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to fetch cars.");
        });
    } else {
      setCars([]);
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search by brand"
      />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  flatlist: {
    marginTop: 16,
  },
  item: {
    marginBottom: 12,
  },
});
