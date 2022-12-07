import {motion, useDragControls, useMotionValue} from "framer-motion"
import {usePathname, useRouter} from "next/navigation"
import {useRef} from "react"

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
	const pathname = usePathname()
	const router = useRouter()

	const screenWidth = useMainStore((state) => state.screenWidth)
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)

	const itemSeparation = itemWidth * 0.4

	const hasDragged = useRef(false)

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
							if (!hasDragged.current) {
								if (pathname !== `/${shader.slug}/`) router.push(`/${shader.slug}/`)
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
					min: -(Array.from(shaderList.keys()).length - 1) * itemSeparation,
					max: 0,
					modifyTarget: (target) => Math.round(target / itemSeparation) * itemSeparation,
				}}
				onDragStart={() => void (hasDragged.current = true)}
				onUpdate={(latest) => void x.set(Number(latest.x))}
			/>
		</div>
	)
}

export default SwitcherLayout
