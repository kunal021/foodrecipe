import { Stack } from "expo-router";
import "../global.css";
import { useColorScheme } from "nativewind";
import ThemeToggle from "../components/ThemeToggle";
import { SavedRecipeProvider } from "../context/SavedRecipeProvider";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <SavedRecipeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
          },
          headerTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
          statusBarStyle: colorScheme === "dark" ? "light" : "dark",
          statusBarBackgroundColor:
            colorScheme === "dark" ? "#000000" : "#FFFFFF",
          statusBarTranslucent: false,
          statusBarAnimation: "none",
          headerRight: () => <ThemeToggle />,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="details/[meal]"></Stack.Screen>
        <Stack.Screen name="countries/[country]"></Stack.Screen>
        <Stack.Screen name="ingridents/[ingrident]"></Stack.Screen>
      </Stack>
    </SavedRecipeProvider>
  );
}
