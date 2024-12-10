import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { View, TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onTermSubmit: () => void;
}

const SearchBar = ({ value, onChange, onTermSubmit }: SearchBarProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <View className="flex-row items-center space-x-5 p-2 w-[90%] my-2 rounded-lg bg-gray-200 dark:bg-gray-800 ">
        <Ionicons
          name="search"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
          value={value}
          onChangeText={onChange}
          onEndEditing={onTermSubmit}
          autoCorrect={false}
          autoCapitalize="none"
          className="flex-1 px-4 py-2 w-full dark:text-dark-text text-lg"
        ></TextInput>
      </View>
    </>
  );
};

export default SearchBar;
