import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
interface SavedRecipeContextType {
  savedRecipes: any[];
  saveRecipe: (recipe: any) => Promise<void>;
  removeRecipe: (id: string) => Promise<void>;
}

const SavedRecipeContext = createContext<SavedRecipeContextType | null>(null);

export const SavedRecipeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    const loadSavedRecipes = async () => {
      try {
        const data = await AsyncStorage.getItem("savedRecipes");
        setSavedRecipes(data ? JSON.parse(data) : []);
      } catch (e) {
        console.error("Error loading saved recipes:", e);
      }
    };

    loadSavedRecipes();
  }, []);

  const saveRecipe = async (recipe: any) => {
    try {
      const updatedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedRecipes);
      await AsyncStorage.setItem(
        "savedRecipes",
        JSON.stringify(updatedRecipes)
      );
      Alert.alert("Success", "Recipe saved successfully!");
    } catch (e) {
      console.error("Error saving recipe:", e);
    }
  };

  const removeRecipe = async (id: string) => {
    try {
      const updatedRecipes = savedRecipes.filter(
        (recipe: any) => recipe.idMeal !== id
      );
      setSavedRecipes(updatedRecipes);
      await AsyncStorage.setItem(
        "savedRecipes",
        JSON.stringify(updatedRecipes)
      );
      Alert.alert("Success", "Recipe removed successfully!");
    } catch (e) {
      console.error("Error removing recipe:", e);
    }
  };
  return (
    <SavedRecipeContext.Provider
      value={{ savedRecipes, saveRecipe, removeRecipe }}
    >
      {children}
    </SavedRecipeContext.Provider>
  );
};

export default SavedRecipeContext;
