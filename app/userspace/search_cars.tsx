import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";
import CarItem from "@/components/CarItem";
import handleDelete from "@/app/userspace/index"
import Icon from "react-native-vector-icons/FontAwesome"
import { Stack, useRouter } from "expo-router";

export default function SearchCars() {
  const router = useRouter();
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const normalizedSearchTerm = searchTerm.toLowerCase();

  useEffect(() => {
    if (searchTerm) {
      api
        .get(`/api/collections/cars/records`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const filteredCars = response.data.items.filter(car =>
            car.brand.toLowerCase() === normalizedSearchTerm
          );
          setCars(filteredCars);
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to fetch cars.");
        });
    } else {
      setCars([]);
    }
  }, [searchTerm]);

  const handleDelete = (id?: string) => {
    api
      .delete(`/api/collections/cars/records/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        Alert.alert("Sucesso", "Carro excluído com sucesso");
        router.push("/userspace"); 
      })
      .catch(() => {
        Alert.alert("Erro", "Falha ao excluir carro.");
      });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
              options={{
                title: "Buscar Carros",
              }}
            />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#dedede" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Pesquisar por marca"
          placeholderTextColor="#dedede"
        />
      </View>
      <FlatList
        data={cars}
        renderItem={({ item }) => (
                  <CarItem car={item} onDelete={handleDelete} />
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
    backgroundColor: "#1c1c1c",
  },
  input: {
    flex: 1,
    color: "#dedede"
  },
  flatlist: {
    marginTop: 16,
  },
  item: {
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 10,
    boxShadow: "4px 4px #dedede",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "#323232",
  },
  icon: {
    marginRight: 8,
  },
});
