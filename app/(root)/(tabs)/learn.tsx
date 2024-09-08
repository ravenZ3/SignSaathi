import React, { useState } from "react"
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import Card from "@/components/Card"
import { useRouter } from "expo-router"

const Learn = () => {
	const [language, setLanguage] = useState("en")
	const router = useRouter()

	const toggleLanguage = () => {
		setLanguage((prevLanguage) => (prevLanguage === "en" ? "gu" : "en"))
	}

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<Text style={styles.headerText}>
					{language === "en"
						? "Learn with SignSaathi"
						: "સાઇનસાથી સાથે શીખો"}
				</Text>

				<Card
					imgPath={images.gujratiCharacters}
					title={
						language === "en"
							? "Gujarati Alphabets"
							: "ગુજરાતી અક્ષરમાળા"
					}
					subtext={
						language === "en"
							? "Learn the Gujarati alphabets through interactive lessons."
							: "ઇન્ટરેક્ટિવ પાઠો દ્વારા ગુજરાતી અક્ષરમાળા શીખો."
					}
					onPress={() => router.replace("/(pages)/alphabets")}
				/>

				<Card
					imgPath={images.gujratiNumbers}
					title={
						language === "en"
							? "Gujarati Numerals"
							: "ગુજરાતી આંકડા"
					}
					subtext={
						language === "en"
							? "Understand Gujarati numerals and practice writing them."
							: "ગુજરાતી આંકડા સમજવો અને તેને લખવાનું અભ્યાસ કરવું."
					}
					onPress={() => router.replace("/(pages)/numerals")}
				/>
			</ScrollView>

			<TouchableOpacity
				style={styles.languageButton}
				onPress={toggleLanguage}
			>
				<Text style={styles.languageButtonText}>
					{language === "en" ? "ગુજરાતી" : "English"}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "#a1a1a1",
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 16,
		paddingBottom: 80,
	},
	headerText: {
		color: "white",
		fontSize: 42,
		padding: 16,
		paddingHorizontal: 45,
		fontWeight: "bold",
		textAlign: "center",
	},
	languageButton: {
		position: "absolute",
		top: 20,
		right: 20,
		backgroundColor: "#007BFF",
		padding: 12,
		borderRadius: 50,
		alignItems: "center",
		zIndex: 1, // Ensure the button is above other elements
	},
	languageButtonText: {
		color: "white",
		fontSize: 16,
	},
})

export default Learn
