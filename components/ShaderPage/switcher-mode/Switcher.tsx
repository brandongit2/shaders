import {motion, useDragControls, useMotionValue} from "framer-motion"
import {useEffect, useState} from "react"

import type {ReactElement} from "react"

import shaderList from "../shaderList"
import SwitcherItem from "./SwitcherItem"

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
				dragControls={controls}
				dragTransition={{
					power: 0.5,
					timeConstant: 200,
					min: -(shaderList.length - 1) * itemSeparation,
					max: 0,
					modifyTarget: (target) => Math.round(target / itemSeparation) * itemSeparation,
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
