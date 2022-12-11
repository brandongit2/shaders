"use client"

import {useMotionValue, useTransform} from "framer-motion"
import invariant from "ts-invariant"

import type {FC, ReactNode} from "react"

import Switcher from "./Switcher"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	children: ReactNode
}

const SwitcherLayout: FC<Props> = ({children}) => {
	const currentShaderIndex = useMainStore((state) => state.currentShaderIndex)
	invariant(currentShaderIndex !== null, `currentShaderIndex is null`)
	const screenWidth = useMainStore((state) => state.screenWidth)

	const itemWidth = Math.min(screenWidth / 2, 30 * 16)
	const x = useMotionValue(0)
	const u = useTransform(x, (val) => val - currentShaderIndex * itemWidth)

	return (
		<div className="grid h-full w-full grid-rows-[1fr_auto_minmax(max-content,1fr)] items-center">
			<div />

			<div className="isolate h-[min(50vw,30rem)] w-full">
				<Switcher onXChange={(newX) => void x.set(newX)}>{children}</Switcher>
			</div>

			<div className="z-10">
				<p>{shaderList[currentShaderIndex]?.name}</p>
			</div>
		</div>
	)
}

export default SwitcherLayout
