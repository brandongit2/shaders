import {animate, motion, useDragControls, useMotionTemplate, useMotionValue, useTransform} from "framer-motion"
import {useEffect, useState} from "react"

import type {AnimationOptions} from "framer-motion"
import type {ReactElement} from "react"

import shaderList from "./shaderList"
import SwitcherItem from "./SwitcherItem"

const animOptions: AnimationOptions<number> = {
	type: `spring`,
	damping: 17,
	stiffness: 150,
	mass: 1,
}

const Switcher = (): ReactElement | null => {
	const x = useMotionValue(0)
	const controls = useDragControls()

	const [screenWidth, setScreenWidth] = useState(1024)
	useEffect(() => {
		const updateScreenWidth = () => void setScreenWidth(window.innerWidth)
		updateScreenWidth()

		window.addEventListener(`resize`, updateScreenWidth)
		return () => void window.removeEventListener(`resize`, updateScreenWidth)
	}, [])
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)

	const offset = useMotionValue(0)

	const itemSeparation = itemWidth * 0.4

	return (
		<>
			<motion.div className="fixed top-1/2 left-0 h-[min(50vw,30rem)] w-full -translate-y-1/2 [perspective:1500px]">
				{shaderList.map((shader, i) => (
					<SwitcherItem key={shader.day} place={i} x={x} offset={offset}>
						{shader.image}
					</SwitcherItem>
				))}
			</motion.div>
			<motion.div
				drag="x"
				dragSnapToOrigin
				dragControls={controls}
				dragConstraints={{left: 0, right: 0}}
				dragElastic={0.7}
				dragTransition={animOptions}
				onDragEnd={() => {
					const xWithOffset = offset.get() * itemSeparation - x.get()
					const newOffset = Math.max(0, Math.min(Math.round(xWithOffset / itemSeparation), shaderList.length - 1))
					return animate(offset, newOffset, animOptions)
				}}
				onUpdate={(latest) => void x.set(Number(latest.x))}
			/>
			<motion.div
				onPointerDown={(evt) => void controls.start(evt)}
				className="fixed inset-0 cursor-grab touch-none active:cursor-grabbing"
			/>
		</>
	)
}

export default Switcher
