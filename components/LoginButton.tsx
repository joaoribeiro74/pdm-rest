import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTokenContext } from "../src/contexts/userContext";
import api from "../src/services/api";

type LoginButtonProps = {
  href: string;
  title?: string;
  email: string;
  password: string;
} & TouchableOpacityProps;

export default function LoginButton({ href, title, email, password, ...props }: LoginButtonProps) {
  const { token, setToken } = useTokenContext();
  const router = useRouter();

  const handlePress = async () => {
    // Verifica se o token já existe
    if (token) {
      return router.push("/userspace");
    }

    try {
      const result = await api.post(
        "/api/collections/users/auth-with-password",
        {
          identity: email,
          password: password,
        }
      );

      // Armazena o token e redireciona
      setToken(result.data.token);
      router.push(href); // Redireciona para a URL do href
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]} onPress={handlePress}>
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
