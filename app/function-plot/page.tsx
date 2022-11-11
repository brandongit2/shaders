"use client"

import clsx from "clsx"
import {motion} from "framer-motion"

import type {ReactElement} from "react"

import Description from "./Description"
import useDescriptionStore from "./descriptionStore"
import FunctionPlot from "./FunctionPlot"
import Overlay from "./Overlay"
import OverlayShadow from "./OverlayShadow"
import ScrollProgress from "./ScrollProgress"

const FunctionPlotPage = (): ReactElement | null => {
	const isDescriptionOpen = useDescriptionStore((state) => state.isDescriptionOpen)

	return (
		<div className="mx-auto grid h-full max-w-4xl grid-rows-[min(100vw,50vh)_auto] gap-6 p-2 text-white md:grid-cols-2 md:grid-rows-1 md:p-6">
			<motion.div
				layout
				style={isDescriptionOpen ? {} : {position: `fixed`, inset: `0px`}}
				animate={isDescriptionOpen ? {borderRadius: `16px`} : {borderRadius: `0px`}}
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
				className={clsx(
					`relative z-10 overflow-hidden shadow-lg shadow-black/30`,
					isDescriptionOpen && `h-full md:order-2 md:my-auto md:max-h-[30rem]`
				)}
			>
				<div className="absolute inset-0 overflow-hidden">
					<FunctionPlot />
				</div>

				<OverlayShadow />
				<Overlay />
			</motion.div>

			{/* Take the canvas' place when it's animating to full-screen */}
			{!isDescriptionOpen && <div className="md:order-2" />}

			<div className="grid h-full grid-cols-[2rem_1fr] overflow-hidden">
				<div className="grid place-items-center">
					<ScrollProgress />
				</div>
				<Description />
			</div>
		</div>
	)
}

export default FunctionPlotPage
