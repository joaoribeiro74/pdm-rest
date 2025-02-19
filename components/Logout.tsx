import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type LogoutButtonProps = {
  onPress: () => void; // Define o tipo da função onPress
};

export default function LogoutButton({ onPress }: LogoutButtonProps) {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
      <Text style={styles.buttonText}>Logout</Text>
      <Icon name="exit-run" size={20} color="#dedede" /> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
   display: "flex",
   flexDirection: "row",
   gap: 6,
   paddingVertical: 4,
   paddingHorizontal: 8,
   borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
