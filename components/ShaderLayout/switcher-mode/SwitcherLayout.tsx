"use client"

import {motion, useMotionValue, useTransform} from "framer-motion"
import {useState} from "react"
import invariant from "ts-invariant"

import type {FC, ReactNode} from "react"

import {transition} from "../transition"
import Info from "./Info"
import Switcher from "./Switcher"
import {clamp} from "~/helpers/math"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	children: ReactNode
}

const SwitcherLayout: FC<Props> = ({children}) => {
	const currentShaderIndex = useMainStore((state) => state.currentShaderIndex)
	invariant(currentShaderIndex !== null, `currentShaderIndex is null`)
	const appMode = useMainStore((state) => state.appMode)

	const screenWidth = useMainStore((state) => state.screenWidth)
	const itemWidth = Math.min(screenWidth / 2, 30 * 16)
	const itemSeparation = itemWidth * 0.4

	const [initialShaderIndex] = useState(currentShaderIndex)
	const x = useMotionValue(-initialShaderIndex * itemSeparation)
	const u = useTransform(x, (val) => clamp(-val / itemSeparation, 0, shaderList.length - 1))

	return (
		<div className="grid h-full w-full grid-rows-[1fr_auto_1fr] items-center overflow-hidden">
			<div />

			<div className="h-[min(50vw,30rem)] w-full">
				<Switcher onXChange={(newX) => void x.set(newX)}>{children}</Switcher>
			</div>

			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: appMode === `switcher` ? 1 : 0}}
				transition={{...transition, delay: 0.4, duration: transition.duration - 0.4}}
				className="relative h-full w-full"
			>
				{shaderList.map((shader, i) => (
					<div key={`switcher-label-${shader.slug}`} className="absolute inset-0">
						<Info x={u} shaderIndex={i} />
					</div>
				))}
			</motion.div>
		</div>
	)
}

export default SwitcherLayout
