import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import TruncateString from "../utils/truncateStr";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useSavedRecipe } from "../hooks/useSavedRecipe";

const Content = ({ results }: { results: any[] }) => {
  const router = useRouter();
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipe();
  return (
    <>
      <View className="flex-1 w-[90%] h-full">
        <FlatList
          data={results}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => {
            return (
              <View className="flex-1 flex-row justify-start items-start gap-2 my-2 p-2 rounded-md bg-gray-200 dark:bg-gray-800">
                <Image
                  source={{ uri: item.strMealThumb }}
                  alt={item.strMeal}
                  className="w-40 h-40 rounded-md"
                />
                <View className="flex-1 flex-col justify-between items-start h-full">
                  <View className="flex-row justify-between items-center w-full">
                    <Text className="text-xl font-bold dark:text-white">
                      {TruncateString(item.strMeal, 2)}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        savedRecipes.includes(item)
                          ? removeRecipe(item.idMeal)
                          : saveRecipe(item)
                      }
                    >
                      <AntDesign
                        name="star"
                        size={24}
                        color={
                          savedRecipes.includes(item) ? "yellow" : "#6b7280"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row justify-between items-center w-full">
                    <Text className="text-lg font-bold bg-gray-100 dark:bg-gray-400 dark:text-white p-1.5 rounded-md">
                      {item.strCategory}
                    </Text>
                    <Text className="text-lg font-bold bg-gray-100 dark:bg-gray-400 dark:text-white p-1.5 rounded-md">
                      {item.strArea}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/details/[meal]?mealId=${item.idMeal}`)
                    }
                    className="bg-blue-100 border border-blue-500  p-1.5 rounded-md self-center w-full"
                  >
                    <Text className="text-lg font-bold text-center">
                      Full Recipe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default Content;
