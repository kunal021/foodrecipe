import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeToggle from "@/src/components/ThemeToggle";
import "../../global.css";
import { useColorScheme } from "nativewind";

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
        },
        headerTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "star-sharp" : "star-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
