"use client"

import {motion, useTransform} from "framer-motion"

import type {MotionValue} from "framer-motion"
import type {FC} from "react"

import shaderList from "~/shaders/shaderList"

type Props = {
	x: MotionValue<number>
	shaderIndex: number
}

const Info: FC<Props> = ({x, shaderIndex}) => {
	const shader = shaderList[shaderIndex]!

	const u = useTransform(x, (val) => 1 - (1.7 * Math.abs(val - shaderIndex)) ** 2)

	return (
		<motion.div className="flex h-full w-full flex-col items-center justify-center" style={{opacity: u}}>
			<h1 className="text-center text-xl font-bold">
				<span className="font-normal text-white/60">Day {shader.day} | </span>
				{shader.name}
			</h1>
			<p className="text-white/30">{shader.date}</p>
		</motion.div>
	)
}

export default Info
