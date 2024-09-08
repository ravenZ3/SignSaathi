import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ value }) => {
  return (
    <View className="w-full bg-gray-300 rounded-full h-2.5">
      <View className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${value}%` }} />
    </View>
  );
};

export default ProgressBar;
