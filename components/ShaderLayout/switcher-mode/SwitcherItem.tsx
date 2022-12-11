"use client"

import {motion, useMotionTemplate, useTransform} from "framer-motion"
import {useState} from "react"
import invariant from "ts-invariant"

import type {MotionValue} from "framer-motion"
import type {ReactNode, FC} from "react"

import {smoothStep} from "~/helpers/math"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	overwriteImage?: ReactNode
	shaderIndex: number
	x: MotionValue<number>
	onClick: () => void
}

const SwitcherItem: FC<Props> = ({shaderIndex, x, overwriteImage, onClick}) => {
	const currentShaderIndex = useMainStore((state) => state.currentShaderIndex)
	invariant(currentShaderIndex !== null, `currentShaderIndex is null`)
	const [initialShaderIndex] = useState(currentShaderIndex)

	const screenWidth = useMainStore((state) => state.screenWidth)
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)

	const spinAt = itemWidth * 0.35
	const itemSeparation = itemWidth * 0.4

	// In pixels. 0 is center of screen, lower is left, greater is right
	const u = useTransform(x, (val) => val + (shaderIndex - initialShaderIndex) * itemSeparation)

	const middleSpace = itemWidth * 0.3
	const translateX = useTransform(u, (val) => {
		if (shaderIndex === 0 && val > 0) return val
		if (shaderIndex === shaderList.length - 1 && val < 0) return val

		if (val < -spinAt) return val - middleSpace
		if (val >= -spinAt && val < 0) return val + smoothStep(-spinAt, 0, val) * middleSpace - middleSpace
		if (val >= 0 && val <= spinAt) return val + smoothStep(0, spinAt, val) * middleSpace
		if (val > spinAt) return val + middleSpace
	})

	const defaultZ = -70
	const deltaZ = 70
	const translateZ = useTransform(u, (val) => {
		if (shaderIndex === 0 && val > 0) return defaultZ + deltaZ
		if (shaderIndex === shaderList.length - 1 && val < 0) return defaultZ + deltaZ
		if (val < 0) {
			return smoothStep(-spinAt - 40, -spinAt + 40, val) * deltaZ + defaultZ
		} else {
			return (1 - smoothStep(spinAt - 40, spinAt + 40, val)) * deltaZ + defaultZ
		}
	})

	const rotationAmount = 70
	const rotation = useTransform(u, (val) => {
		if (shaderIndex === 0 && val > 0) return 0
		if (shaderIndex === shaderList.length - 1 && val < 0) return 0
		if (val < 0) {
			return (1 - smoothStep(-spinAt, 0, val)) * rotationAmount
		} else {
			return smoothStep(0, spinAt, val) * -rotationAmount
		}
	})

	return (
		<>
			<motion.div
				className="absolute h-[min(50vw,30rem)] w-[min(50vw,30rem)] select-none"
				style={{
					transform: useMotionTemplate`translateZ(${translateZ}px) rotateY(${rotation}deg)`,
					left: useMotionTemplate`calc(50% + ${translateX}px - min(50vw, 30rem) / 2)`,
					zIndex: useTransform(u, (val) => -Math.abs(val) + shaderList.length * itemSeparation),
				}}
				onClick={() => void onClick()}
			>
				{overwriteImage ?? (
					<div className="h-full w-full overflow-hidden rounded-2xl">{shaderList[shaderIndex]!.image}</div>
				)}
			</motion.div>
			<motion.div
				style={{
					transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translate(-50%, 100%) scaleY(-1) rotateY(${rotation}deg)`,
					zIndex: useTransform(u, (val) => -Math.abs(val)),
				}}
				className="pointer-events-none absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)] select-none overflow-hidden rounded-[16px] bg-[#111] saturate-[80%] [&>*]:opacity-20"
			>
				{shaderList[shaderIndex]!.image}
			</motion.div>
		</>
	)
}

export default SwitcherItem
