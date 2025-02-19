import { useState, useEffect } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { Stack } from "expo-router";

export default function CarsHp() {
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  useEffect(() => {
    api
    .get(`/api/collections/cars/records?filter=hp>200&sort=${sortOrder === "desc" ? "-hp" : "hp"}`, {        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCars(response.data.items);
      })
      .catch((error) => {
        Alert.alert("Erro", "Falha ao buscar dados do carro.");
      });
  }, [sortOrder]);

  return (
    <View style={styles.container}>
      <Stack.Screen 
                    options={{
                      title: "Ordem por HP",
                    }}
                  />
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonHP} onPress={toggleSortOrder}>
          <Text style={styles.buttonText}>
            Ordenar Carros com HP {'>'} 200cv ({sortOrder === "desc" ? "Decrescente" : "Crescente"})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <View style={styles.item}>
                <Text style={styles.titleProduct}>{item.brand} {item.model}</Text>
                <Text style={styles.infoTitle}>ID:
                  <Text style={styles.info}> {item.id}</Text>
                </Text>
                <Text style={styles.infoTitle}>Potência:
                  <Text style={styles.info}> {item.hp} cv</Text>
                </Text>
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
    backgroundColor: "#1c1c1c"
  },
  flatlist: {
    marginTop: 16,
  },
  item: {
    display: 'flex',
    width: '90%',
    flexDirection: "column",
    marginTop: 10,
    padding: 30,
    marginBottom: 10,
    borderColor: "#dedede",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    boxShadow: "4px 4px #dedede",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#323232",
  },
  titleProduct: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#dedede"
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 5,
    color: "#dedede"
  },
  info: {
    fontWeight: "500",
    fontSize: 13,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonHP: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 10,
    boxShadow: "4px 4px #dedede",
    height: 40,
    width: "90%",
  },
  buttonText: {
    color: "#dedede",
    fontWeight: "600",
    fontSize: 15,
    textAlign: 'center',
  },
});
