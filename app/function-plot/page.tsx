"use client"

import {useState} from "react"

import type {ReactElement} from "react"

import Description from "./Description"
import FunctionPlot from "./FunctionPlot"
import Overlay from "./Overlay"
import OverlayShadow from "./OverlayShadow"

const FunctionPlotPage = (): ReactElement | null => {
	const [areDetailsOpen, setAreDetailsOpen] = useState(false)

	return (
		<div className="mx-auto grid h-full max-w-2xl grid-rows-[min(100vw,50vh)_auto] gap-6 p-2 text-white">
			<div className="relative z-10 h-full overflow-hidden rounded-xl shadow-lg shadow-black/50">
				<div className="absolute inset-0 overflow-hidden">
					<FunctionPlot />
				</div>

				<OverlayShadow />
				<Overlay areDetailsOpen={areDetailsOpen} setAreDetailsOpen={setAreDetailsOpen} />
			</div>

			<div className="grid grid-cols-[2rem_1fr]">
				<div className="mx-auto h-full w-4 bg-white/60" />
				<Description />
			</div>
		</div>
	)
}

export default FunctionPlotPage
