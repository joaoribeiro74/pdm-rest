import { Stack } from "expo-router";

export default function Home() {
    return (
        <Stack 
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#111"
                    
                },
                headerTintColor: "#dedede"
            }}
        />
    );
}