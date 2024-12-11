import api from "@/src/apis/axios";
import TruncateString from "@/src/utils/truncateStr";
import { Feather } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

const fetchData = async (
  mealId: string,
  setResult: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    setLoading(true);
    setError(null);
    const response = await api.get("/lookup.php", {
      params: { i: mealId },
    });
    // console.log(response.data.meals[0]);
    setResult(response.data.meals[0] || {});
  } catch (error) {
    console.log(error);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

const DetailsScreen = () => {
  const { mealId } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [result, setResult] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(mealId.toString(), setResult, setLoading, setError);
  }, [mealId]);

  const ingridients = Object.entries(result).filter(
    ([key, value]) =>
      key.includes("strIngredient") && value !== null && value !== ""
  );

  const measures = Object.entries(result).filter(
    ([key, value]) =>
      key.includes("strMeasure") && value !== null && value !== ""
  );

  const ingredientsWithMeasures: any[] = ingridients.map(
    ([ingridientKey, ingridientValue], index) => {
      const [measuresKey, measuresValue] = measures[index] || [];
      return {
        ingridient: ingridientValue,
        measures: measuresValue,
      };
    }
  );

  const instructions =
    result.strInstructions &&
    result?.strInstructions
      .split(".")
      .map((instruction: string) => instruction.trim())
      .filter((instruction: string) => instruction !== "");

  if (loading && !error && !result) {
    return (
      <View className="flex-1 justify-center items-center dark:bg-black">
        <Feather
          name="loader"
          size={30}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </View>
    );
  }

  if (error && !loading) {
    return (
      <View className="flex-1 justify-center items-center dark:bg-black">
        <Text className="dark:text-white text-xl">{error}</Text>
      </View>
    );
  }

  if (!loading && !result) {
    return (
      <View className="flex-1 justify-center items-center dark:bg-black">
        <Text className="dark:text-white text-xl">No result found</Text>
      </View>
    );
  }
  // console.log(result);

  return (
    <>
      <Stack.Screen
        options={{
          title: result.strMeal
            ? TruncateString(result.strMeal, 3)
            : "Meal Details",
        }}
      />
      <ScrollView
        className="flex-1 dark:bg-black"
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-[90%] self-center flex-col justify-start items-start">
          <Image
            source={{ uri: result.strMealThumb }}
            alt={result.strMeal}
            className="w-full h-80 rounded-md"
          />
          <Text className="text-2xl font-bold dark:text-white text-center py-4 w-full">
            {result.strMeal}
          </Text>
          {result.strSource && result.strYoutube && (
            <View className="flex-row justify-between items-center w-full mb-5">
              <Link
                href={result.strSource}
                className="text-lg font-bold border border-blue-500 bg-blue-200 rounded-md p-1.5 w-[40%] text-center"
              >
                Source
              </Link>
              <Link
                href={result.strYoutube}
                className="text-lg font-bold border border-red-500 bg-red-200 rounded-md p-1.5 w-[40%] text-center"
              >
                Youtube
              </Link>
            </View>
          )}
          <View className="justify-start items-start bg-gray-200 dark:bg-gray-800 p-4 rounded-md w-full mb-4">
            <Text className="text-xl font-bold dark:text-white pb-4">
              Ingredients
            </Text>
            {ingredientsWithMeasures?.map((item, index: number) => (
              <Text
                key={index.toString()}
                className="text-lg font-semibold dark:text-white w-full"
              >
                {index + 1}. {item.ingridient} : {item.measures}
              </Text>
            ))}
          </View>
          <View className="justify-start items-start bg-gray-200 dark:bg-gray-800 p-4 rounded-md w-full">
            <Text className="text-xl font-bold dark:text-white pb-4">
              Instructions to Prepare
            </Text>
            {instructions?.map((instruction: any, index: number) => (
              <Text
                key={index.toString()}
                className="text-lg font-semibold dark:text-white w-full"
              >
                {index + 1}. {instruction.trim()}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
