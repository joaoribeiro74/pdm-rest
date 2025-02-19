import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ActionButtonProps = {
  title: string;
  onPress: () => void; // Função onPress para o botão
};

export default function ActionButton({ title, onPress }: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: 150,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#dedede',
    backgroundColor: '#323232',
    borderRadius: 10,
    boxShadow: "4px 4px #dedede",
    marginTop: 20,
  },
  buttonText: {
    color: "#dedede",
    fontWeight: "600",
    fontSize: 18,
    textAlign: 'center',
  },
});
