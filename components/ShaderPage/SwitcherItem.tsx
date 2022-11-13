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
		setScreenWidth(window.innerWidth)
	}, [])

	const spinAt = 80

	const itemSeparation = 120
	const u = useTransform(
		x,
		[0, screenWidth],
		[-screenWidth / 2 + place * itemSeparation, screenWidth / 2 + place * itemSeparation],
		{clamp: false},
	)

	const middleSpace = 160
	const translateX = useTransform(u, (val) => {
		if (val < -spinAt) return val - middleSpace
		if (val >= -spinAt && val < 0) return val + smoothStep(-spinAt, 0, val) * middleSpace - middleSpace
		if (val >= 0 && val <= spinAt) return val + smoothStep(0, spinAt, val) * middleSpace
		if (val > spinAt) return val + middleSpace
	})

	const defaultZ = -100
	const deltaZ = 20
	const translateZ = useTransform(u, (val) => {
		if (val < 0) {
			return smoothStep(-spinAt - 40, -spinAt + 40, val) * deltaZ + defaultZ
		} else {
			return (1 - smoothStep(spinAt - 40, spinAt + 40, val)) * deltaZ + defaultZ
		}
	})

	const rotationAmount = 50
	const rotation = useTransform(u, (val) => {
		if (val < 0) {
			return (1 - smoothStep(-spinAt, 0, val)) * rotationAmount
		} else {
			return smoothStep(0, spinAt, val) * -rotationAmount
		}
	})

	return (
		<motion.div
			style={{
				transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translateX(-50%) rotateY(${rotation}deg)`,
				zIndex: useTransform(u, (val) => -Math.abs(val)),
			}}
			className="pointer-events-none absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)]"
		>
			{children}
		</motion.div>
	)
}

export default SwitcherItem
