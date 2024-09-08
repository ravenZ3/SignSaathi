import React from "react";
import { View, Text } from "react-native";
import { tw } from "nativewind"; // Import nativewind's tw function for styling

type Props = {
  isCorrect: boolean | null;
  correctAnswer: string;
};

const ResultCard = (props: Props) => {
  const { isCorrect, correctAnswer } = props;

  if (isCorrect === null) {
    return null;
  }

  const text = isCorrect
    ? "Correct"
    : "Incorrect! The correct answer is " + correctAnswer;

  const borderColor = isCorrect ? "border-green-500" : "border-red-500";

  return (
    <View style={tw(`border-2 ${borderColor} rounded-lg p-4 text-center text-lg font-semibold my-4 bg-secondary`)}>
      <Text>{text}</Text>
    </View>
  );
};

export default ResultCard;
