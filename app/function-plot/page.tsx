"use client"

import clsx from "clsx"
import Link from "next/link"
import {useState} from "react"

import type {ReactElement} from "react"

import FunctionPlot from "./FunctionPlot"

const FunctionPlotPage = (): ReactElement | null => {
	const [areDetailsOpen, setAreDetailsOpen] = useState(false)

	return (
		<div
			className={clsx(
				`absolute inset-0 overflow-hidden text-white transition-[border-radius,inset] duration-1000`,
				areDetailsOpen && `inset-8 rounded-xl`
			)}
		>
			<div className="absolute inset-0 overflow-hidden">
				<FunctionPlot />
			</div>

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

			<div className="absolute left-0 bottom-0 flex w-full items-end justify-between p-8">
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
			</div>
		</div>
	)
}

export default FunctionPlotPage
