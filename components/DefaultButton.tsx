import { TouchableOpacity, TouchableOpacityProps ,Text, StyleSheet} from "react-native";
import { useRouter } from "expo-router";

type DefaultButtonProps = {
  href: string;
  title?: string;
} & TouchableOpacityProps;

export default function DefaultButton({ href, title, ...props }: DefaultButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]} onPress={() => router.push(href as any)}>
      <Text style={styles.buttonText}>{title}</Text>
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
});
