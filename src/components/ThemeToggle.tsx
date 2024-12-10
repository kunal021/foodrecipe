import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="mr-4 p-2 rounded-full"
    >
      <Ionicons
        name={colorScheme === "dark" ? "moon" : "sunny"}
        size={24}
        color={colorScheme === "dark" ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}
