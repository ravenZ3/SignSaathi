import React, { useState } from "react"
import {
	View,
	Text,
	TextInput,
	FlatList,
	TouchableOpacity,
	Modal,
	Image,
	StyleSheet,
} from "react-native"
import BackButton from "@/components/BackButton"
import { gif } from "@/constants"

const Alphabets = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedGif, setSelectedGif] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)
	const [language, setLanguage] = useState("en")

	const gifList = Object.keys(gif) // Get all gif names

	const filteredGifList = gifList.filter((gifName) =>
		gifName.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const toggleLanguage = () => {
		setLanguage(language === "en" ? "gu" : "en")
	}

	const openModal = (gifName) => {
		setSelectedGif(gif[gifName])
		setModalVisible(true)
	}

	const closeModal = () => {
		setModalVisible(false)
		setSelectedGif(null)
	}

	return (
		<View style={styles.container}>
			<BackButton redirectPath="/(root)/(tabs)/learn" />
			<Text style={styles.headerText}>
				{language === "en" ? "Dictionary" : "શબ્દકોશ"}
			</Text>

			{/* Search Bar */}
			<TextInput
				style={styles.searchBar}
				placeholder={
					language === "en" ? "Search GIF..." : "GIF શોધો..."
				}
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{/* Language Toggle Button */}
			<TouchableOpacity
				style={styles.languageButton}
				onPress={toggleLanguage}
			>
				<Text style={styles.languageButtonText}>
					{language === "en" ? "ગુજરાતી" : "English"}
				</Text>
			</TouchableOpacity>

			{/* GIF List */}
			<FlatList
				data={filteredGifList}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => openModal(item)}
					>
						<Text style={styles.itemText}>{item}</Text>
					</TouchableOpacity>
				)}
			/>

			{selectedGif && (
				<Modal
					visible={modalVisible}
					transparent={true}
					animationType="fade"
					onRequestClose={closeModal}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Image
								source={selectedGif}
								style={styles.gifImage}
							/>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={closeModal}
							>
								<Text style={styles.closeButtonText}>
									Close
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 16,
	},
	searchBar: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		marginBottom: 16,
	},
	item: {
		padding: 16,
		borderBottomColor: "lightgray",
		borderBottomWidth: 1,
	},
	itemText: {
		fontSize: 18,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
	},
	gifImage: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
	closeButton: {
		marginTop: 20,
		padding: 10,
		paddingHorizontal: 30,
		backgroundColor: "#FF5722",
		borderRadius: 8,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
	},
	languageButton: {
		backgroundColor: "#007BFF",
		padding: 10,
		borderRadius: 8,
		alignSelf: "center",
		marginVertical: 10,
	},
	languageButtonText: {
		color: "white",
		fontSize: 16,
	},
})

export default Alphabets
