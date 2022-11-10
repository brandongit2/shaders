"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import {MotionCanvas} from "framer-motion-3d"
import Link from "next/link"
import {useState} from "react"
import {WebGLRenderer} from "three"

import type {ReactElement} from "react"

import FunctionPlot from "./FunctionPlot"

const FunctionPlotPage = (): ReactElement | null => {
	const [areDetailsOpen, setAreDetailsOpen] = useState(false)

	return (
		<motion.div
			layout
			style={{
				width: areDetailsOpen ? `80%` : `100%`,
				height: areDetailsOpen ? `80%` : `100%`,
				top: areDetailsOpen ? `10%` : `0`,
				left: areDetailsOpen ? `10%` : `0`,
			}}
			transition={{duration: 1, ease: `easeInOut`}}
			className={clsx(
				`absolute overflow-hidden text-white transition-[border-radius] duration-1000`,
				areDetailsOpen && `rounded-xl`
			)}
		>
			<MotionCanvas
				flat
				linear
				gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}
			>
				<FunctionPlot />
			</MotionCanvas>

			<div
				className="absolute bottom-0 left-0 h-28 w-full"
				style={{
					backgroundImage: `
              linear-gradient(
                0deg,
                rgb(0% 0% 0% / 0.78) 0%,
                rgb(0% 0% 0% / 0.75031) 12.5%,
                rgb(0% 0% 0% / 0.66577) 25%,
                rgb(0% 0% 0% / 0.53924) 37.5%,
                rgb(0% 0% 0% / 0.39) 50%,
                rgb(0% 0% 0% / 0.24075) 62.5%,
                rgb(0% 0% 0% / 0.11422) 75%,
                rgb(0% 0% 0% / 0.02968) 87.5%,
                rgb(0% 0% 0% / 0) 100%
              )
            `,
				}}
			/>

			<motion.div layout className="absolute left-0 top-0 p-8">
				<div className="translate-y-1">
					<h1 className="mb-1 text-xl font-bold">
						<span className="font-normal opacity-80">Day 1 | </span>
						Function plot
					</h1>
					<button type="button" onClick={() => void setAreDetailsOpen((v) => !v)} className="text-sm underline">
						{areDetailsOpen ? `Hide` : `Open`} description + breakdown
					</button>
				</div>

				<p className="text-sm opacity-50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					{` `}on 9 Nov 2022.
				</p>
			</motion.div>
		</motion.div>
	)
}

export default FunctionPlotPage
