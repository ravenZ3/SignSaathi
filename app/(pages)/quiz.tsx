import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
	Image,
} from "react-native"
import ProgressBar from "@/components/ProgressBar" // Custom ProgressBar component
import ResultCard from "@/components/ResultCard"
import BackButton from "@/components/BackButton"
import Bar from "@/components/Bar"
import { images, gif } from "@/constants"
import { useRouter } from "expo-router"

function f() {
	console.log(Object.keys(gif).length);  // Logs the number of GIF entries
  }
  
const questions = [
	{
		questionText: "What is the main subject of this GIF?",
		imageUri: gif.zero, // GIF 
		answers: [
			
			{ answerText: "1", isCorrect: false, id: 2 },
			{ answerText: "2", isCorrect: false, id: 3 },
			{ answerText: "0", isCorrect: true, id: 1 },
			{ answerText: "3", isCorrect: false, id: 4 },
		],
	},
	{
		questionText: "What action is shown in this GIF?",
		imageUri: gif.one, // GIF 1
		answers: [
			{ answerText: "1", isCorrect: true, id: 1 },
			{ answerText: "0", isCorrect: false, id: 2 },
			{ answerText: "2", isCorrect: false, id: 3 },
			{ answerText: "3", isCorrect: false, id: 4 },
		],
	},
	{
		questionText: "Identify the key element in this GIF.",
		imageUri: gif.two, // GIF 2
		answers: [
			{ answerText: "2", isCorrect: true, id: 1 },
			{ answerText: "0", isCorrect: false, id: 2 },
			{ answerText: "1", isCorrect: false, id: 3 },
			{ answerText: "3", isCorrect: false, id: 4 },
		],
	},
	{
		questionText: "What is the setting of this GIF?",
		imageUri: gif.three, // GIF 3
		answers: [
			{ answerText: "3", isCorrect: true, id: 1 },
			{ answerText: "0", isCorrect: false, id: 2 },
			{ answerText: "1", isCorrect: false, id: 3 },
			{ answerText: "2", isCorrect: false, id: 4 },
		],
	},
	{
		questionText: "What type of GIF is this?",
		imageUri: gif.four, // GIF 4
		answers: [
			{ answerText: "4", isCorrect: true, id: 1 },
			{ answerText: "0", isCorrect: false, id: 2 },
			{ answerText: "1", isCorrect: false, id: 3 },
			{ answerText: "2", isCorrect: false, id: 4 },
		],
	},
]

const Quiz = () => {
	const [started, setStarted] = useState(false)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [score, setScore] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState(null)
	const [isCorrect, setIsCorrect] = useState(null)
	const [isSubmitted, setSubmitted] = useState(false)
	const router = useRouter()
	const handleNext = () => {
		if (!started) {
			setStarted(true)
			return
		}
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
		} else {
			setSubmitted(true)
		}
		setSelectedAnswer(null)
		setIsCorrect(null)
	}

	const handlePrev = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1)
		}
	}

	const handleAnswer = (answer) => {
		setSelectedAnswer(answer.id)
		const isCurrentCorrect = answer.isCorrect
		if (isCurrentCorrect) {
			setScore(score + 1)
		}
		setIsCorrect(isCurrentCorrect)
	}

	const scorePercentage = (score / questions.length) * 100
	if (isSubmitted && scorePercentage === 100) {
		return (
			<View style={styles.container}>
				<BackButton
					redirectPath={"/(root)/(tabs)/home"}
					style={styles.backButton}
				/>
				<View style={styles.congratulationsContainer}>
					<Image source={images.owlSmile} style={styles.owlImage} />
					<Text style={styles.congratsText}>
						 Perfect Score 🥳
					</Text>
				</View>
			</View>
		)
	}
	if (isSubmitted) {
		const correctPercentage = (score / questions.length) * 100
		const incorrectPercentage = 100 - correctPercentage

		return (
			<View style={styles.container}>
				<ResultCard
					isCorrect={isCorrect}
					correctAnswer={
						questions[currentQuestion].answers.find(
							(answer) => answer.isCorrect === true
						)?.answerText
					}
				/>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Back to home.</Text>
					<BackButton redirectPath={"/(root)/(tabs)/home"} />
				</View>
				<Text style={styles.finalScore}>
					{score} ({correctPercentage.toFixed(2)}%)
				</Text>
				<View style={styles.barContainer}>
					<View style={styles.barLabel}>
						<Text style={styles.labelText}>Correct Answers</Text>
						<Bar percentage={correctPercentage} color="green" />
					</View>
					<View style={styles.barLabel}>
						<Text style={styles.labelText}>Incorrect Answers</Text>
						<Bar percentage={incorrectPercentage} color="red" />
					</View>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			{!started && (
				<Modal visible={!started} animationType="slide">
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>
							Ready to start the quiz?
						</Text>
						<TouchableOpacity
							style={styles.startButton}
							onPress={() => setStarted(true)}
						>
							<Text style={styles.startButtonText}>Start</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			)}
			<View style={styles.header}>
				<View className="flex flex-row justify-between">
					<TouchableOpacity
						onPress={handlePrev}
						style={styles.navButton}
					>
						<Text style={styles.navButtonText}>Previous</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.navButton} onPress={() => (router.replace('/(root)/(tabs)/home'))}>
						<Text style={styles.navButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
				<ProgressBar
					value={(currentQuestion / questions.length) * 100}
				/>
			</View>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<Text style={styles.questionText}>
					{questions[currentQuestion].questionText}
				</Text>
				<Image
					source={questions[currentQuestion].imageUri}
					style={styles.image}
				/>
				<View style={styles.answerContainer}>
					{questions[currentQuestion].answers.map((answer) => {
						const variant =
							selectedAnswer === answer.id
								? isCorrect
									? "success"
									: "danger"
								: "outline"
						return (
							<TouchableOpacity
								key={answer.id}
								onPress={() => handleAnswer(answer)}
								style={[styles.answerButton, styles[variant]]}
							>
								<Text style={styles.answerText}>
									{answer.answerText}
								</Text>
							</TouchableOpacity>
						)
					})}
				</View>
			</ScrollView>
			<TouchableOpacity style={styles.footerButton} onPress={handleNext}>
				<Text style={styles.footerButtonText}>
					{!started
						? "Start"
						: currentQuestion === questions.length - 1
							? "Submit"
							: "Next"}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#12121212",
		borderRadius: 2,
		borderColor: "red",
		color: "white",
	},
	barContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		marginHorizontal: 20,
	},
	barLabel: {
		alignItems: "center",
	},
	labelText: {
		color: "white",
		fontSize: 16,
		marginBottom: 10,
	},
	owlImage: {
		width: 300,
		height: 300,
		alignSelf: "center",
		marginBottom: 20,
	},
	congratulationsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 200,
		marginVertical: 20,
	},
	answerContainer: {
		marginVertical: 20,
	},
	answerButton: {
		padding: 10,
		borderRadius: 8,
		marginVertical: 5,
		color: "white",
	},
	success: {
		backgroundColor: "#28a745",
	},
	danger: {
		backgroundColor: "#dc3545",
	},
	outline: {
		borderColor: "white",
		borderWidth: 1,
	},
	startButton: {
		padding: 10,
		backgroundColor: "#007bff",
		borderRadius: 5,
	},
	startButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	footer: {
		marginTop: 20,
		alignItems: "center",
	},
	footerButton: {
		backgroundColor: "#007bff",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginVertical: 20,
	},
	footerButtonText: {
		color: "#fff",
		fontSize: 18,
	},
	questionText: {
		fontSize: 18,
		color: "white",
		textAlign: "center",
	},
	modalContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalText: {
		fontSize: 18,
		marginBottom: 20,
	},
	navButton: {
		padding: 6,
		borderRadius: 50,
		borderColor: "white",
		borderWidth: 2,
		marginBottom: 10,
	},
	navButtonText: {
		color: "#007bff",
		fontSize: 16,
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
	},
	backButton: {
		marginTop: 10,
	},
	finalScore: {
		fontSize: 24,
		color: "white",
		textAlign: "center",
		marginVertical: 20,
	},
})

export default Quiz
