"use client"

import {motion, useMotionTemplate, useTransform} from "framer-motion"
import {usePathname, useRouter} from "next/navigation"

import type {MotionValue} from "framer-motion"
import type {ReactElement} from "react"

import shaderList from "../shaderList"
import useStore from "../store"
import {smoothStep} from "~/helpers/math"
import {useScreenWidth} from "~/utils/useScreenWidth"

type Props = {
	shaderSlug: string
	x: MotionValue<number>
	offset: MotionValue<number>
}

const SwitcherItem = ({shaderSlug, x, offset}: Props): ReactElement | null => {
	const screenWidth = useScreenWidth()!
	const router = useRouter()
	const pathname = usePathname()
	const currentShader = useStore((state) => state.shader)
	const toggleSwitcher = useStore((state) => state.toggleSwitcher)

	const itemWidth = Math.min(screenWidth / 2, 30 * 16)
	const shader = shaderList.find((shader) => shader.slug === shaderSlug)!
	const shaderIndex = shaderList.findIndex((shader) => shader.slug === shaderSlug)

	const spinAt = itemWidth * 0.35

	const itemSeparation = itemWidth * 0.4
	const u = useTransform(x, (val) => {
		return val + (shaderIndex - offset.get()) * itemSeparation
	})

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

	return (
		<>
			<motion.div
				className="absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)] overflow-hidden rounded-[16px]"
				style={{
					transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translateX(-50%) rotateY(${rotation}deg)`,
					zIndex: useTransform(u, (val) => -Math.abs(val)),
				}}
				onClick={() => {
					if (pathname === `/${currentShader?.slug}/`) {
						toggleSwitcher()
					} else {
						router.push(shader.slug)
					}
				}}
			>
				{shader.image}
			</motion.div>
			<motion.div
				style={{
					transform: useMotionTemplate`translateX(${translateX}px) translateZ(${translateZ}px) translate(-50%, 100%) scaleY(-1) rotateY(${rotation}deg)`,
					zIndex: useTransform(u, (val) => -Math.abs(val)),
				}}
				className="pointer-events-none absolute left-1/2 h-[min(50vw,30rem)] w-[min(50vw,30rem)] overflow-hidden rounded-[16px] bg-[#222] saturate-[80%] [&>*]:opacity-20"
			>
				{shader.image}
			</motion.div>
		</>
	)
}

export default SwitcherItem
