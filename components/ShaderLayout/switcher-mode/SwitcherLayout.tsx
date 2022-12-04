import {motion, useDragControls, useMotionValue} from "framer-motion"

import type {FC, ReactNode} from "react"

import SwitcherItem from "./SwitcherItem"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	children: ReactNode
}

const SwitcherLayout: FC<Props> = ({children}) => {
	const x = useMotionValue(0)
	const controls = useDragControls()
	const currentShader = useMainStore((state) => state.shader)

	const screenWidth = useMainStore((state) => state.screenWidth)
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)

	const itemSeparation = itemWidth * 0.4

	return (
		<div className="flex h-full w-full items-center overflow-hidden">
			<motion.div
				className="h-[min(50vw,30rem)] w-full [perspective:1500px]"
				onDragStart={(e) => {
					e.preventDefault()
				}}
				onPointerDown={(e) => void controls.start(e)}
			>
				{Array.from(shaderList.values()).map((shader) => (
					<SwitcherItem
						key={shader.day}
						shaderSlug={shader.slug}
						x={x}
						overwriteImage={currentShader?.day === shader.day ? children : undefined}
					/>
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
		</div>
	)
}

export default SwitcherLayout
