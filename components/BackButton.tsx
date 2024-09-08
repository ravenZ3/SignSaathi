import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const BackButton = ({redirectPath}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="rounded-full border-2 m-4 border-white w-16 h-15 justify-center items-center active:bg-slate-600 active:text-white"
      onPress={() => router.replace(redirectPath)}
    >
      <Text className="text-white text-5xl">
        {"<"}
      </Text>
    </TouchableOpacity>
  );
};

export default BackButton;
