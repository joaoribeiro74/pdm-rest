import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";
import CreateButton from "@/components/CreateButton";
import DefaultButton from "@/components/DefaultButton";
import DeleteButton from "@/components/DeleteButton";
import CarItem from "@/components/CarItem";
import HeaderRight from "@/components/HeaderRight";

export default function Home() {
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // exemplo com then-catch (na outra página usaremos async-await)
    api
      .get("/api/collections/cars/records", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCars(response.data.items);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }, []);

    const handleDelete = (id?: string) => {
      api
        .delete(`/api/collections/cars/records/${id}`, {
          headers: { Authorization: token },
        })
        .then(() => {
          Alert.alert("Sucesso", "Carro excluído com sucesso");
          router.push("/userspace"); // Redireciona após a exclusão
        })
        .catch(() => {
          Alert.alert("Erro", "Falha ao excluir carro.");
        });
    };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />
        }}
      />
      <CreateButton 
        style={{ marginVertical: 20 }} 
        href="/userspace/create_car" 
        title="Criar Carro" 
      />

      <View style={styles.searches}>
        <DefaultButton
          href="/userspace/search_cars"
          title="Buscar Carros"
        />

        <DefaultButton
          href="/userspace/cars_hp"
          title="Ordem por HP"
        />
      </View>

      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <CarItem car={item} onDelete={handleDelete} />
        )}
        keyExtractor={(car) => car.id || ""}
        style={styles.flatlist}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#1c1c1c'
  },
  flatlist: {
    padding: 16,
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 16 
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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  searches: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  }
});
