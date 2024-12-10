import { useContext } from "react";
import SavedRecipeContext from "../context/SavedRecipeProvider";

export const useSavedRecipe = () => {
  const context = useContext(SavedRecipeContext);

  if (!context) {
    throw new Error("useSavedRecipe must be used within a SavedRecipeProvider");
  }

  return context;
};
