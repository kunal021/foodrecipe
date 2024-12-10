import api from "@/src/apis/axios";
import Content from "@/src/components/Content";
import SearchBar from "@/src/components/SearchBar";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const fetchData = async (
  searchTerm: string,
  setResults: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    setLoading(true);
    setError(null);
    const response = await api.get("/search.php", {
      params: { s: searchTerm },
    });

    setResults(response.data.meals || []);
  } catch (error) {
    console.log(error);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const [results, setResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("cake", setResults, setLoading, setError);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchData(searchTerm, setResults, setLoading, setError);
    }
  };

  return (
    <View className="flex-1 justify-center items-center dark:bg-black">
      <SearchBar
        value={searchTerm}
        onChange={(newTerm) => setSearchTerm(newTerm)}
        onTermSubmit={handleSearch}
      />
      {loading && !error && !results.length ? (
        <View className="flex-1 justify-center items-center">
          <Feather
            name="loader"
            size={30}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
      ) : error && !loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="dark:text-white text-xl">{error}</Text>
        </View>
      ) : !loading && !results.length ? (
        <View className="flex-1 justify-center items-center">
          <Text className="dark:text-white text-xl">No results found</Text>
        </View>
      ) : (
        <Content results={results} />
      )}
    </View>
  );
}
