import api from "@/src/apis/axios";
import TruncateString from "@/src/utils/truncateStr";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

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
    console.log(response.data.meals[0]);
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
      <View className="flex-1 justify-center items-center dark:bg-black">
        <View className="flex-1 w-[90%] self-center flex-col justify-start items-start py-5">
          <Image
            source={{ uri: result.strMealThumb }}
            alt={result.strMeal}
            className="w-full h-80 rounded-md"
          />
          <Text className="text-2xl font-bold dark:text-white text-center py-4 w-full">
            {result.strMeal}
          </Text>
          {/* <View className="flex-row justify-between items-center w-full">
            <Text className="text-lg font-bold bg-gray-100 dark:bg-gray-400 dark:text-white p-1.5 rounded-md">
              {result.strCategory}
            </Text>
            <Text className="text-lg font-bold bg-gray-100 dark:bg-gray-400 dark:text-white p-1.5 rounded-md">
              {result.strArea}
            </Text>
          </View> */}
        </View>
      </View>
    </>
  );
};

export default DetailsScreen;
