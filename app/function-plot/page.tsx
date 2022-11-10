"use client"

import {useState} from "react"

import type {ReactElement} from "react"

import Description from "./Description"
import FunctionPlot from "./FunctionPlot"
import Overlay from "./Overlay"
import OverlayShadow from "./OverlayShadow"
import ScrollProgress from "./ScrollProgress"

const FunctionPlotPage = (): ReactElement | null => {
	const [areDetailsOpen, setAreDetailsOpen] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)

	return (
		<div className="mx-auto grid h-full max-w-4xl grid-rows-[min(100vw,50vh)_auto] gap-6 p-2 text-white md:p-6 lg:grid-cols-[1fr_minmax(30rem,1fr)] lg:grid-rows-1">
			<div className="relative z-10 h-full overflow-hidden rounded-xl shadow-lg shadow-black/50 lg:order-2 lg:my-auto lg:max-h-[30rem]">
				<div className="absolute inset-0 overflow-hidden">
					<FunctionPlot />
				</div>

				<OverlayShadow />
				<Overlay areDetailsOpen={areDetailsOpen} setAreDetailsOpen={setAreDetailsOpen} />
			</div>

			<div className="grid h-full grid-cols-[2rem_1fr] overflow-hidden">
				<div className="grid place-items-center">
					<ScrollProgress scrollProgress={scrollProgress} />
				</div>
				<Description scrollProgress={scrollProgress} setScrollProgress={setScrollProgress} />
			</div>
		</div>
	)
}

export default FunctionPlotPage
