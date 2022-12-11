import {motion, useDragControls, useMotionValue} from "framer-motion"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useRef, useState} from "react"

import type {FC, ReactNode} from "react"

import SwitcherItem from "./SwitcherItem"
import {clamp, roundToNearest} from "~/helpers/math"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	children: ReactNode
}

const SwitcherLayout: FC<Props> = ({children}) => {
	const controls = useDragControls()
	const currentShader = useMainStore((state) => state.shader)
	const pathname = usePathname()
	const router = useRouter()
	const beginTransition = useMainStore((state) => state.beginTransition)
	const initialShaderIndex = useRef(shaderList.findIndex((shader) => shader.slug === currentShader?.slug))
	const [activeShader, setActiveShader] = useState(initialShaderIndex.current)
	const pendingTransition = useRef(false)

	const screenWidth = useMainStore((state) => state.screenWidth)
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)

	const itemSeparation = itemWidth * 0.4
	const x = useMotionValue(0)

	const hasDragged = useRef(false)

	useEffect(() => {
		if (pendingTransition.current) beginTransition(`fullscreen`)
	}, [beginTransition, currentShader])

	return (
		<div className="flex h-full w-full items-center overflow-hidden">
			<motion.div
				className="h-[min(50vw,30rem)] w-full touch-none [perspective:1500px]"
				onPointerDown={(e) => void controls.start(e)}
			>
				{shaderList.map((shader) => (
					<SwitcherItem
						key={shader.day}
						shaderSlug={shader.slug}
						x={x}
						overwriteImage={currentShader?.day === shader.day ? children || <div /> : undefined}
						onClick={() => {
							if (
								!hasDragged.current &&
								pathname !== `/${shader.slug}/` &&
								shaderList[activeShader]?.day === shader.day
							) {
								router.push(`/${shader.slug}/`)
								pendingTransition.current = true
							}

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
					min: (1 - Array.from(shaderList.keys()).length + initialShaderIndex.current) * itemSeparation,
					max: initialShaderIndex.current * itemSeparation,
					modifyTarget: (target) => {
						const newTarget = roundToNearest(target, itemSeparation) + initialShaderIndex.current
						setActiveShader(
							clamp(
								Math.round(-newTarget / itemSeparation) + initialShaderIndex.current,
								0,
								Array.from(shaderList.keys()).length - 1,
							),
						)
						return newTarget
					},
				}}
				onDragStart={() => void (hasDragged.current = true)}
				onDragEnd={() => void setTimeout(() => void (hasDragged.current = false), 10)}
				onUpdate={(latest) => void x.set(Number(latest.x))}
			/>
		</div>
	)
}

export default SwitcherLayout
