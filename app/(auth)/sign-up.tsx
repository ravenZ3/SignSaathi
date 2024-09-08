import {
	View,
	Text,
	Image,
	StatusBar,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "@/constants"
import { useState } from "react"
import {
	GestureHandlerRootView,
	ScrollView,
} from "react-native-gesture-handler"
import { Link, Router, useRouter } from "expo-router"
import { icons } from "@/constants"
import InputField from "@/components/InputField"
import CustomButton from "@/components/CustomButton"
const SignUp = () => {
	const [form, setForm] = useState({ name: "", email: "", password: "" })
	const router = useRouter()
	return (
		<GestureHandlerRootView>
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar />
					<View>
						<Image
							source={images.getStarted}
							className="z-0  w-full absolute"
						/>
					</View>
					<View className=" flex-1 justify-center p-5">
						<View>
							<TouchableOpacity
								className="rounded-full border-2 border-white w-20 pl-4"
								onPress={() =>
									router.replace("/(auth)/welcome")
								}
							>
								<Text className="text-white text-7xl top-[+3px]">
									{"<"}
								</Text>
							</TouchableOpacity>
						</View>
						<ScrollView className="flex-1 ">
							<View>
								<Text className="text-center text-white my-6 shadow-md p-5 font-bold text-5xl">
									Create your Account.
								</Text>
							</View>
							<InputField
								label="Name"
								placeholder="Enter your name."
								icon={icons.person}
								value={form.name}
								onChangeText={(value) =>
									setForm({ ...form, name: value })
								}
							></InputField>
							<InputField
								label="Email"
								placeholder="email."
								icon={icons.person}
								value={form.email}
								onChangeText={(value) =>
									setForm({ ...form, email: value })
								}
							></InputField>
							<InputField
								label="Password"
								placeholder="password"
								icon={icons.person}
								value={form.password}
								onChangeText={(value) =>
									setForm({ ...form, password: value })
								}
							></InputField>
							<CustomButton
								className="w-11/12 mt-10 bg-[#654520] border-2 "
								title="Sign Up"
							></CustomButton>
							<View className="rounded-full">
								<View className="flex flex-row justify-between py-4 px-6">
									<Text className="text-general-100 ">
										Already have an account?
									</Text>
									<Link
										href={"/(auth)/sign-in"}
										className="text-white border-2 border-white rounded-full p-2  "
									>
										Sign In
									</Link>
								</View>
							</View>
						</ScrollView>
					</View>
				</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default SignUp
