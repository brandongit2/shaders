"use client"

import {motion, useDragControls, useMotionValue} from "framer-motion"

import type {FC} from "react"

import shaderList from "../shaderList"
import SwitcherItem from "./SwitcherItem"
import {useScreenWidth} from "~/utils/useScreenWidth"

const Switcher: FC = () => {
	const x = useMotionValue(0)
	const controls = useDragControls()

	const screenWidth = useScreenWidth()!
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)

	const offset = useMotionValue(0)

	const itemSeparation = itemWidth * 0.4

	return (
		<>
			<motion.div
				className="fixed top-1/2 left-0 h-[min(50vw,30rem)] w-full -translate-y-1/2 [perspective:1500px]"
				onPointerDown={(e) => void controls.start(e)}
			>
				{Array.from(shaderList.values()).map((shader) => (
					<SwitcherItem key={shader.day} shaderSlug={shader.slug} x={x} offset={offset} />
				))}
			</motion.div>
			<motion.div
				drag="x"
				dragControls={controls}
				dragTransition={{
					power: 0.5,
					timeConstant: 200,
					min: -(Array.from(shaderList.keys()).length - 1) * itemSeparation,
					max: 0,
					modifyTarget: (target) => Math.round(target / itemSeparation) * itemSeparation,
				}}
				onUpdate={(latest) => void x.set(Number(latest.x))}
			/>
		</>
	)
}

export default Switcher
