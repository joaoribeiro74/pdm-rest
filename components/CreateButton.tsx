import { TouchableOpacity, TouchableOpacityProps ,Text, StyleSheet, View } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";

type CreateButtonProps = {
  href: string;
  title?: string;
} & TouchableOpacityProps;

export default function CreateButton({ href, title, ...props }: CreateButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]} onPress={() => router.push(href as any)}>
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.iconContainer}>
        <Icon name="plus" size={20} color="#dedede" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#dedede',
    boxShadow: '4px 4px #dedede',
    backgroundColor: '#323232',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: "#dedede",
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: "#222",
    height: '100%',
    width: 40,
    alignItems: 'center',
  },
});
