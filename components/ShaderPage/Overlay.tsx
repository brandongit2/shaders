"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import Link from "next/link"
import shallow from "zustand/shallow"

import type {ReactElement} from "react"

import useDescriptionStore from "./descriptionStore"

type Props = {
	dayNumber: number
	name: string
	date: string
}

const Overlay = ({dayNumber, name, date}: Props): ReactElement | null => {
	const {isDescriptionOpen, toggleDescription} = useDescriptionStore(
		(state) => ({isDescriptionOpen: state.isDescriptionOpen, toggleDescription: state.toggleDescription}),
		shallow
	)

	return (
		<>
			<motion.div
				layout
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
				className={clsx(`absolute left-8`, isDescriptionOpen ? `bottom-6` : `bottom-14 sm:bottom-6`)}
			>
				<h1 className="mb-1 text-xl font-bold">
					<span className="font-normal text-white/60">Day {dayNumber} | </span>
					{name}
				</h1>
				<button type="button" onClick={() => void toggleDescription()} className="text-left text-sm underline">
					{isDescriptionOpen ? `Hide` : `Open`} description + breakdown
				</button>
			</motion.div>

			<motion.div
				layout
				transition={{
					duration: 1,
					ease: [0.65, 0, 0.35, 1],
					opacity: {duration: 0.6, delay: isDescriptionOpen ? 0 : 0.4},
				}}
				animate={{opacity: isDescriptionOpen ? 0 : 1}}
				className={clsx(`absolute left-8 bottom-6 sm:left-auto sm:right-8`, isDescriptionOpen && `pointer-events-none`)}
			>
				<p className="text-sm text-white/50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					{` `}on {date}.
				</p>
			</motion.div>
		</>
	)
}

export default Overlay
