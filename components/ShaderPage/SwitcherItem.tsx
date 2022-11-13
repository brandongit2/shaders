import {motion, useMotionTemplate, useTransform} from "framer-motion"
import {useEffect, useState} from "react"

import type {MotionValue} from "framer-motion"
import type {ReactElement, ReactNode} from "react"

import {smoothStep} from "~/helpers/math"

type Props = {
	children: ReactNode
	place: number
	x: MotionValue<number>
}

const SwitcherItem = ({children, place, x}: Props): ReactElement | null => {
	const [screenWidth, setScreenWidth] = useState(1024)
	useEffect(() => {
		const updateScreenWidth = () => void setScreenWidth(window.innerWidth)
		updateScreenWidth()

		window.addEventListener(`resize`, updateScreenWidth)
		return () => void window.removeEventListener(`resize`, updateScreenWidth)
	}, [])
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)
	console.log(screenWidth)

	const spinAt = itemWidth * 0.35

	const itemSeparation = itemWidth * 0.4
	const u = useTransform(
		x,
		[0, screenWidth],
		[-screenWidth / 2 + place * itemSeparation, screenWidth / 2 + place * itemSeparation],
		{clamp: false},
	)

	const middleSpace = itemWidth * 0.3
	const translateX = useTransform(u, (val) => {
		if (val < -spinAt) return val - middleSpace
		if (val >= -spinAt && val < 0) return val + smoothStep(-spinAt, 0, val) * middleSpace - middleSpace
		if (val >= 0 && val <= spinAt) return val + smoothStep(0, spinAt, val) * middleSpace
		if (val > spinAt) return val + middleSpace
	})

	const defaultZ = -100
	const deltaZ = 70
	const translateZ = useTransform(u, (val) => {
		if (val < 0) {
			return smoothStep(-spinAt - 40, -spinAt + 40, val) * deltaZ + defaultZ
		} else {
			return (1 - smoothStep(spinAt - 40, spinAt + 40, val)) * deltaZ + defaultZ
		}
	})

	const rotationAmount = 70
	const rotation = useTransform(u, (val) => {
		if (val < 0) {
			return (1 - smoothStep(-spinAt, 0, val)) * rotationAmount
		} else {
			return smoothStep(0, spinAt, val) * -rotationAmount
		}
	})

	return (
		<>
			<motion.div
				style={{
					transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translateX(-50%) rotateY(${rotation}deg)`,
					zIndex: useTransform(u, (val) => -Math.abs(val)),
				}}
				className="pointer-events-none absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)] overflow-hidden rounded-[16px]"
			>
				{children}
			</motion.div>
			<motion.div
				style={{
					transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translate(-50%, 100%) scaleY(-1) rotateY(${rotation}deg)`,
					zIndex: useTransform(u, (val) => -Math.abs(val)),
				}}
				className="pointer-events-none absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)] overflow-hidden rounded-[16px] bg-[#222] saturate-[80%] [&>*]:opacity-20"
			>
				{children}
			</motion.div>
		</>
	)
}

export default SwitcherItem
