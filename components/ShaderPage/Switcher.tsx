import {motion, useDragControls, useMotionValue} from "framer-motion"

import type {ReactElement} from "react"

import shaderList from "./shaderList"
import SwitcherItem from "./SwitcherItem"

const Switcher = (): ReactElement | null => {
	const x = useMotionValue(0)
	const controls = useDragControls()

	return (
		<>
			<motion.div className="fixed top-1/2 left-0 h-[min(50vw,30rem)] w-full -translate-y-1/2 [perspective:1500px]">
				{shaderList.map((shader, i) => (
					<SwitcherItem key={shader.day} place={i} x={x}>
						{shader.image}
					</SwitcherItem>
				))}
			</motion.div>
			<motion.div drag="x" dragControls={controls} onUpdate={(latest) => void x.set(Number(latest.x))} />
			<motion.div
				onPointerDown={(evt) => void controls.start(evt)}
				className="fixed inset-0 cursor-grab touch-none active:cursor-grabbing"
			/>
		</>
	)
}

export default Switcher
