import React from "react"
import { View } from "react-native"

const Bar = ({ percentage, color }) => {
	const barStyle = { height: `${percentage}%` }

	const BarBgClasses = {
		green: "bg-green-500",
		red: "bg-red-500",
		blue: "bg-blue-500",
	}

	return (
		<View className="h-40 w-20 flex justify-end items-end">
			<View
				className={`${BarBgClasses[color]} w-24 rounded-xl border-2 border-black shadow-md shadow-black`}
				style={barStyle}
			/>
		</View>
	)
}

export default Bar
