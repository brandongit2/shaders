"use client"

import {Joan, Outfit} from "@next/font/google"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"
import Link from "next/link"
import {useState} from "react"

import type {ReactElement} from "react"

import FunctionPlot from "./FunctionPlot"
import Katex from "~/components/Katex"

// eslint-disable-next-line @typescript-eslint/quotes
const joan = Joan({weight: "400"})
// eslint-disable-next-line @typescript-eslint/quotes
const outfit = Outfit({weight: "700"})

const FunctionPlotPage = (): ReactElement | null => {
	const [areDetailsOpen, setAreDetailsOpen] = useState(false)

	return (
		<div className="mx-auto grid h-full max-w-2xl grid-rows-[min(100vw,50vh)_auto] gap-6 p-2 text-white">
			<div className="relative z-10 h-full overflow-hidden rounded-xl shadow-lg shadow-black/50">
				<div className="absolute inset-0 overflow-hidden">
					<FunctionPlot />
				</div>

				<div
					className="absolute bottom-0 left-0 h-36 w-full"
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

				<div className="absolute left-0 bottom-0 flex w-full flex-col justify-between gap-4 px-8 pb-6">
					<div>
						<h1 className="mb-1 text-xl font-bold">
							<span className="font-normal opacity-70">Day 1 | </span>
							Function plot
						</h1>
						<button
							type="button"
							onClick={() => void setAreDetailsOpen((v) => !v)}
							className="text-left text-sm underline"
						>
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

			<div className="grid grid-cols-[2rem_1fr]">
				<div className="mx-auto h-full w-4 bg-white/60" />

				<ScrollArea.Root className="mr-2 overflow-hidden">
					<ScrollArea.Viewport className="h-full w-full px-2 opacity-90" style={{overflow: `scroll`}}>
						<h2
							className={clsx(
								outfit.className,
								`mb-4 inline-block bg-white/60 text-2xl font-bold leading-none text-[#22074A]`
							)}
						>
							Description
						</h2>
						<p className={joan.className}>
							This is a plot of the function <Katex>{`x^2 + \\frac{1}{5}\\sin(5x + t)`}</Katex> on the domain{` `}
							<Katex>{`x \\in [1, 1]`}</Katex> and range <Katex>y \in [0.1, 1.1]</Katex>.
						</p>
					</ScrollArea.Viewport>
				</ScrollArea.Root>
			</div>
		</div>
	)
}

export default FunctionPlotPage
