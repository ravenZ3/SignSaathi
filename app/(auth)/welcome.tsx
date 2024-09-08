import { Text, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useRouter } from "expo-router"
import Swiper from "react-native-swiper"
import { useRef, useState } from "react"
import { onboarding } from "@/constants"
import CustomButton from "@/components/CustomButton"

const Welcome = () => {
	const router = useRouter() // Initialize the router
	const swiperRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const isLastSlide = activeIndex === onboarding.length - 1
	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				{/* Skip Button aligned to the right */}
				<View style={styles.skipButtonContainer}>
					<TouchableOpacity
						onPress={() => {
							router.replace("/(root)/(tabs)/home")
						}}
					>	
						{!isLastSlide && <Text style={styles.skipButtonText}>Skip</Text>}
						{isLastSlide && <Text style={styles.skipButtonText}></Text>}

					</TouchableOpacity>
				</View>

				{/* Swiper Component */}
				<Swiper
					ref={swiperRef}
					loop={false}
					dot={<View style={styles.dot} />}
					activeDot={<View style={styles.activeDot} />}
					onIndexChanged={(index) => setActiveIndex(index)}
				>
					{onboarding.map((item, index) => (
						<View
							key={index}
							className="flex-1 items-center justify-center gap-7"
						>
							<Text className="font-bold text-3xl">
								{item.title}
							</Text>
							<Text className="text-md color-slate-500 text-center mb-10">
								{item.description}
							</Text>
						</View>
					))}
				</Swiper>
				<View className="flex justify-center items-center">
					<CustomButton
						title={isLastSlide ? "Get Started" : "Next"}
						className="w-11/12 mb-10 w-80 bg-[#654520] border-0 "
						onPress={() => isLastSlide?router.replace('/(auth)/sign-up'):swiperRef.current?.scrollBy(1)}
					/>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
		justifyContent: "space-between",
	},
	skipButtonContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: 16,
	},
	skipButtonText: {
		color: "black",
		fontSize: 18,
		fontWeight: "bold",
	},
	dot: {
		width: 32,
		height: 4,
		marginHorizontal: 1,
		backgroundColor: "#e2e8f0",
		borderRadius: 2,
	},
	activeDot: {
		width: 32,
		height: 4,
		marginHorizontal: 1,
		backgroundColor: "#007AFF",
		borderRadius: 10,
	},
	slide: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
})

export default Welcome
