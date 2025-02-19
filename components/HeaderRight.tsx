import { useRouter } from "expo-router";
import { useTokenContext } from "@/src/contexts/userContext";
import LogoutButton from "@/components/Logout"

export default function HeaderRight() {
    const { setToken } = useTokenContext();
    const router = useRouter();

    const handleLogout = () => {
        setToken(null); // Limpar o token
        router.replace("/"); // Redirecionar para a tela de login
    };

    return (
        <LogoutButton onPress={handleLogout}/>
    )
}