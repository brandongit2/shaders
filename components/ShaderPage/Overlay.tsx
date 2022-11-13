"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import Link from "next/link"
import {BsFillCollectionFill} from "react-icons/bs"
import shallow from "zustand/shallow"

import type {ReactElement} from "react"

import useStore from "./store"

type Props = {
	dayNumber: number
	name: string
	date: string
}

const Overlay = ({dayNumber, name, date}: Props): ReactElement | null => {
	const {appMode, toggleDescription, toggleSwitcher} = useStore(
		(state) => ({
			appMode: state.appMode,
			toggleDescription: state.toggleDescription,
			toggleSwitcher: state.toggleSwitcher,
		}),
		shallow,
	)

	return (
		<>
			<motion.div
				layout
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
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

			<motion.div
				layout
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
				animate={{opacity: appMode === `switcher` ? 0 : 1}}
				className={clsx(`absolute left-8`, appMode === `description` ? `bottom-6` : `bottom-14 sm:bottom-6`)}
			>
				<h1 className="mb-1 text-xl font-bold">
					<span className="font-normal text-white/60">Day {dayNumber} | </span>
					{name}
				</h1>
				<button type="button" onClick={() => void toggleDescription()} className="text-left text-sm underline">
					{appMode === `description` ? `Hide` : `Open`} description + breakdown
				</button>
			</motion.div>

			<motion.div
				layout
				transition={{
					duration: 1,
					ease: [0.65, 0, 0.35, 1],
				}}
				animate={{opacity: appMode === `fullscreen` ? 1 : 0}}
				className={clsx(
					`absolute bottom-6 max-sm:left-8 sm:right-8`,
					appMode === `description` && `pointer-events-none`,
				)}
			>
				<p className="text-sm text-white/50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					{` `}on {date}.
				</p>
			</motion.div>

			<motion.button
				layout
				transition={{
					duration: 1,
					ease: [0.65, 0, 0.35, 1],
					opacity: {duration: 0.6, delay: appMode === `description` ? 0 : 0.4},
				}}
				animate={{opacity: appMode === `description` ? 0 : 0.9}}
				type="button"
				onClick={() => void toggleSwitcher()}
				className="absolute right-8 bottom-8"
			>
				<BsFillCollectionFill size="1.5rem" />
			</motion.button>
		</>
	)
}

export default Overlay
