import {useEffect, useState} from "react"

export const useScreenWidth = (): number | null => {
	const [screenWidth, setScreenWidth] = useState<number | null>(null)
	useEffect(() => {
		const updateScreenWidth = () => void setScreenWidth(window.innerWidth)
		updateScreenWidth()

		window.addEventListener(`resize`, updateScreenWidth)
		return () => void window.removeEventListener(`resize`, updateScreenWidth)
	}, [])

	return screenWidth
}
