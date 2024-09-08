import React, { useState } from "react"
import Card from "@/components/Card"
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"


const Home = () => {
	const [language, setLanguage] = useState("en")

	const toggleLanguage = () => {
		setLanguage((prevLanguage) => (prevLanguage === "en" ? "gu" : "en"))
	}

    const router = useRouter();
	const styles = StyleSheet.create({
		scrollview: {
			flexGrow: 1,
			justifyContent: "center",
			alignItems: "center",
			paddingVertical: 16,
			paddingBottom: 80,
		},
	})

	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<ScrollView contentContainerStyle={styles.scrollview}>
				<View className="flex-1 items-center justify-center">
					<View className="flex">
						<Text className="text-4xl">👋</Text>
					</View>
					<Text className="text-4xl font-bold my-4 mx-10 text-center">
						{language === "en"
							? "Welcome to SignSaathi!"
							: "સાઇનસાથી માં આપનું સ્વાગત છે!"}
					</Text>
					<Text className="text-lg mb-8 text-center mx-10">
						{language === "en"
							? "Learn Gujarati and more through Indian Sign Language with SignSaathi. Practice alphabets, numbers, and essential words with interactive exercises."
							: "સાઇનસાથી સાથે ભારતીય સંકેત ભાષા દ્વારા ગુજરાતી અને વધુ શીખો. ઇન્ટરેક્ટિવ અભ્યાસ સાથે વર્ણમાળા, અંક અને આવશ્યક શબ્દોનો અભ્યાસ કરો."}
					</Text>
					<Card
						imgPath={{ uri: "https://example.com/quiz-image.jpg" }} // Replace with your image URL or import
						title={
							language === "en"
								? "Start Practicing"
								: "અભ્યાસ શરૂ કરો"
						}
						subtext={
							language === "en"
								? "Begin your journey with interactive lessons and quizzes."
								: "ઇન્ટરેક્ટિવ પાઠ અને ક્વિઝ સાથે તમારી મુસાફરી શરૂ કરો."
						}
						onPress={() => {router.replace("/(pages)/quiz")}}
					/>
				</View>
			</ScrollView>
			<TouchableOpacity
				className="absolute top-2 right-2 bg-blue-500 p-3 rounded-full"
				onPress={toggleLanguage}
			>
				<Text className="text-white text-lg">
					{language === "en" ? "ગુજરાતી" : "English"}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default Home
