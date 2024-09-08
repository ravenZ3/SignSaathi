import { View, Text, Image, TouchableOpacity } from "react-native";

const Card = ({ imgPath, title, subtext, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress} // Trigger the onPress action when the card is touched
      className="bg-white rounded-lg shadow-lg overflow-hidden my-4 mx-5"
    >
      {/* Image Section */}
      <View className="h-48">
        <Image
          source={imgPath}
          className="w-full h-full"
          resizeMode="cover" // Ensure the image covers the card without distortion
        />
      </View>

      {/* Text Section */}
      <View className="p-4">
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-gray-500 mt-2">{subtext}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
