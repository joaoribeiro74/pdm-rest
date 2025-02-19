import { View, Text, StyleSheet } from "react-native";
import DefaultButton from "@/components/DefaultButton";
import DeleteButton from "@/components/DeleteButton";
import { Car } from "@/src/types/Car";

type CarItemProps = {
  car: Car;
  onDelete: (id?: string) => void;
};

export default function CarItem({ car, onDelete }: CarItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.titleProduct}>{car.brand} {car.model}</Text>
      <Text style={styles.infoTitle}>ID:
        <Text style={styles.info}> {car.id}</Text>
      </Text>
      <Text style={styles.infoTitle}>Potência:
        <Text style={styles.info}> {car.hp} cv</Text>
      </Text>

      <View style={styles.buttons}>
        <DefaultButton
          title="Editar"
          href={`/userspace/${car.id}/update_car`}  
        />
        <DeleteButton
          title="Deletar"
          onPress={() => onDelete(car.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  }
});
