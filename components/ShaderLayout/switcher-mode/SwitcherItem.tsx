"use client"

import {motion, useMotionTemplate, useTransform} from "framer-motion"

import type {MotionValue} from "framer-motion"
import type {ReactElement, ReactNode} from "react"

import shaderList from "../../../shaders/shaderList"
import useMainStore from "../../../stores/useMainStore"
import {smoothStep} from "~/helpers/math"

type Props = {
	overwriteImage?: ReactNode
	shaderSlug: string
	x: MotionValue<number>
	onClick: () => void
}

const SwitcherItem = ({shaderSlug, x, overwriteImage, onClick}: Props): ReactElement | null => {
	const screenWidth = useMainStore((state) => state.screenWidth)
	const isTransitioning = useMainStore((state) => state.isTransitioning)

	const itemWidth = Math.min(screenWidth / 2, 30 * 16)
	const shader = shaderList.find((shader) => shader.slug === shaderSlug)!
	const shaderIndex = shaderList.findIndex((shader) => shader.slug === shaderSlug)

	const spinAt = itemWidth * 0.35

	const itemSeparation = itemWidth * 0.4
	// In pixels. 0 is center of screen, lower is left, greater is right
	const u = useTransform(x, (val) => val + shaderIndex * itemSeparation)

	const middleSpace = itemWidth * 0.3
	const translateX = useTransform(u, (val) => {
		if (val < -spinAt) return val - middleSpace
		if (val >= -spinAt && val < 0) return val + smoothStep(-spinAt, 0, val) * middleSpace - middleSpace
		if (val >= 0 && val <= spinAt) return val + smoothStep(0, spinAt, val) * middleSpace
		if (val > spinAt) return val + middleSpace
	})

	const defaultZ = -70
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

	// There are two groups of z-indexes:
	// - One from 0 to window.clientWidth / 2 for the reflections
	// - One from 1000 to 1000 + window.clientWidth / 2 for the main items (lower bound was arbitrary)
	const zIndex = useTransform(u, (val) => -Math.abs(val) + 1000)

	// fastStyle relies purely on transforms for translating items, slowStyle relies on `left` for translating items.
	// slowStyle is used for the item being transitioned, so that Framer Motion can correctly measure the item's position.
	const fastStyle = {
		transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translateX(-50%) rotateY(${rotation}deg)`,
		left: `50%`,
		zIndex,
	}
	const slowStyle = {
		transform: useMotionTemplate`translateZ(${translateZ}px) rotateY(${rotation}deg)`,
		left: useMotionTemplate`calc(50% + ${translateX}px - min(50vw, 30rem) / 2)`,
		zIndex: isTransitioning ? 10000 : zIndex,
	}

	return (
		<>
			<motion.div
				className="absolute h-[min(50vw,30rem)] w-[min(50vw,30rem)] select-none"
				style={overwriteImage ? slowStyle : fastStyle}
				onClick={() => void onClick()}
			>
				{overwriteImage ?? <div className="h-full w-full overflow-hidden rounded-2xl">{shader.image}</div>}
			</motion.div>
			<motion.div
				style={{
					transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translate(-50%, 100%) scaleY(-1) rotateY(${rotation}deg)`,
					zIndex: useTransform(u, (val) => -Math.abs(val)),
				}}
				className="pointer-events-none absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)] select-none overflow-hidden rounded-[16px] bg-[#222] saturate-[80%] [&>*]:opacity-20"
			>
				{shader.image}
			</motion.div>
		</>
	)
}

export default SwitcherItem
