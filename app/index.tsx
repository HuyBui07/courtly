import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>welcome</Text>
      <Button mode="elevated" onPress={handleSignIn}>sign in</Button>
    </View>
  );
}
