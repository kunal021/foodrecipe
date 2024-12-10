import Content from "@/src/components/Content";
import { Text, View } from "react-native";
import { useSavedRecipe } from "@/src/hooks/useSavedRecipe";

const SavedScreen = () => {
  const { savedRecipes } = useSavedRecipe();

  if (!savedRecipes.length) {
    return (
      <View className="flex-1 justify-center items-center dark:bg-black">
        <Text className="dark:text-white text-xl">No results found</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 justify-center items-center dark:bg-black">
      <Content results={savedRecipes} />
    </View>
  );
};

export default SavedScreen;
