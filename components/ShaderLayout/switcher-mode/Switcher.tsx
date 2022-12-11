"use client"

import {motion, useDragControls, useMotionValue} from "framer-motion"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useRef, useState} from "react"
import invariant from "ts-invariant"

import type {FC, ReactNode} from "react"

import SwitcherItem from "./SwitcherItem"
import {clamp, roundToNearest} from "~/helpers/math"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	children: ReactNode
	onXChange: (x: number) => void
}

const Switcher: FC<Props> = ({children, onXChange}) => {
	const controls = useDragControls()
	const pathname = usePathname()
	const router = useRouter()
	const x = useMotionValue(0)

	const currentShaderIndex = useMainStore((state) => state.currentShaderIndex)
	const beginTransition = useMainStore((state) => state.beginTransition)

	invariant(currentShaderIndex !== null, `currentShaderIndex is null`)
	const [initialShaderIndex] = useState(currentShaderIndex)

	const hasDragged = useRef(false)
	const pendingTransition = useRef(false)

	const screenWidth = useMainStore((state) => state.screenWidth)
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)
	const itemSeparation = itemWidth * 0.4

	useEffect(
		() => x.onChange((val) => onXChange(val - initialShaderIndex * itemSeparation)),
		[initialShaderIndex, itemSeparation, onXChange, x],
	)

	useEffect(() => {
		if (pendingTransition.current) beginTransition(`fullscreen`)
	}, [beginTransition, currentShaderIndex])

	return (
		<>
			<motion.div
				className="h-full w-full touch-none [perspective:1500px]"
				onPointerDown={(e) => void controls.start(e)}
			>
				{shaderList.map((shader, i) => (
					<SwitcherItem
						key={shader.day}
						shaderIndex={i}
						x={x}
						overwriteImage={shaderList[currentShaderIndex]?.day === shader.day ? children || <div /> : undefined}
						onClick={() => {
							if (!hasDragged.current && pathname === `/${shader.slug}/`) beginTransition(`fullscreen`)
							hasDragged.current = false
						}}
					/>
				))}
			</motion.div>
			<motion.div
				drag="x"
				dragControls={controls}
				dragTransition={{
					power: 0.5,
					timeConstant: 200,
					min: (1 - shaderList.length + initialShaderIndex) * itemSeparation,
					max: initialShaderIndex * itemSeparation,
					modifyTarget: (target) => {
						let newTarget = roundToNearest(target, itemSeparation) + initialShaderIndex
						try {
							return newTarget
						} finally {
							newTarget = clamp(Math.round(-newTarget / itemSeparation) + initialShaderIndex, 0, shaderList.length - 1)
							router.replace(`/${shaderList[newTarget]!.slug}/`)
						}
					},
				}}
				onDragStart={() => void (hasDragged.current = true)}
				onDragEnd={() => void setTimeout(() => void (hasDragged.current = false), 10)}
				onUpdate={(latest) => {
					x.set(Number(latest.x))
				}}
			/>
		</>
	)
}

export default Switcher
