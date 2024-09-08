import BackButton from "@/components/BackButton"
import { View, Text } from "react-native"

const Alphabets = () => {
	return (
		<View>
			<BackButton redirectPath="/(root)/(tabs)/learn" />
			<Text>Dictionary</Text>
		</View>
	)
}

export default Alphabets
