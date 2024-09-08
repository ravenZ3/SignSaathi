import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
	ScrollView,
	Modal,
	Image,
} from "react-native"
import ProgressBar from "@/components/ProgressBar" // Custom ProgressBar component
import ResultCard from "@/components/ResultCard"
import { images } from "@/constants"
import BackButton from "@/components/BackButton"
import Bar from "@/components/Bar"
const questions = [
	// Questions data as per your example
	{
		questionText: "What is React?",
		answers: [
			{
				answerText: "A library for building user interfaces.",
				isCorrect: true,
				id: 1,
			},
			{ answerText: "A backend framework.", isCorrect: false, id: 2 },
			{ answerText: "A programming language.", isCorrect: false, id: 3 },
			{
				answerText: "A database management system.",
				isCorrect: false,
				id: 4,
			},
		],
	},
	{
		questionText: "What is JSX?",
		answers: [
			{
				answerText:
					"JavaScript XML, a syntax extension for JavaScript.",
				isCorrect: true,
				id: 1,
			},
			{ answerText: "A JavaScript framework.", isCorrect: false, id: 2 },
			{
				answerText: "A frontend development tool.",
				isCorrect: false,
				id: 3,
			},
			{
				answerText: "A markup language similar to HTML.",
				isCorrect: false,
				id: 4,
			},
		],
	},
	{
		questionText: "What is the virtual DOM in React?",
		answers: [
			{
				answerText: "A lightweight copy of the real DOM.",
				isCorrect: true,
				id: 1,
			},
			{ answerText: "An alternative to CSS.", isCorrect: false, id: 2 },
			{
				answerText: "A server-side rendering technique.",
				isCorrect: false,
				id: 3,
			},
			{
				answerText: "A database management system.",
				isCorrect: false,
				id: 4,
			},
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
			<View className="flex-1 justify-center items-center bg-[#121212]">
				<BackButton
					redirectPath={"/(root)/(tabs)/home"}
					className="absolute top-2 left-2"
				/>
				<View className="flex flex-col justify-center items-center">
					<Image source={images.owlSmile} style={styles.owlImage} />
					<Text style={styles.congratsText} className="">
						Congratulations! All Correct 🥳
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
				<Text style={styles.finalScore}>
					Your score: {score} ({correctPercentage.toFixed(2)}%)
				</Text>

				{/* Displaying the percentage bars */}
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
							<Text style={styles.footerButtonText}>Start</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			)}
			<View style={styles.header}>
				<TouchableOpacity onPress={handlePrev} style={styles.navButton}>
					<Text style={styles.navButtonText}>Previous</Text>
				</TouchableOpacity>
				<ProgressBar
					value={(currentQuestion / questions.length) * 100}
				/>
				<TouchableOpacity style={styles.navButton}>
					<Text style={styles.navButtonText}>Close</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<Text style={styles.questionText}>
					{questions[currentQuestion].questionText}
				</Text>

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
		backgroundColor: "#121212",
		borderRadius: 2,
		borderColor: "red",
	},
	barContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		marginHorizontal:20,
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
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
		width: "80vw",
	},
	navButton: {
		padding: 8,
		backgroundColor: "#007BFF",
		borderRadius: 4,
	},
	navButtonText: {
		color: "white",
		fontSize: 16,
	},
	congratsText: {
		fontSize: 24,
		color: "green",
		textAlign: "center",
	},
	questionText: {
		fontSize: 24,
		color: "white",
		marginBottom: 16,
		textAlign: "center",
	},
	answerContainer: {
		marginBottom: 20,
	},
	answerButton: {
		padding: 12,
		borderRadius: 4,
		marginBottom: 10,
	},
	answerText: {
		fontSize: 16,
		color: "white",
	},
	outline: {
		borderColor: "#007BFF",
		borderWidth: 2,
	},
	success: {
		backgroundColor: "green",
	},
	danger: {
		backgroundColor: "red",
	},
	footerButton: {
		padding: 12,
		backgroundColor: "#007BFF",
		borderRadius: 4,
		position: "absolute",
		bottom: 20,
		left: 16,
		right: 16,
		alignItems: "center",
	},
	footerButtonText: {
		color: "white",
		fontSize: 18,
	},
	finalScore: {
		fontSize: 18,
		color: "white",
		textAlign: "center",
		marginTop: 20,
	},
	modalContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	modalText: {
		fontSize: 24,
		marginBottom: 20,
	},
	startButton: {
		padding: 12,
		backgroundColor: "#007BFF",
		borderRadius: 4,
	},
})

export default Quiz
