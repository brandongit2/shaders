"use client"

import {motion} from "framer-motion"
import {useEffect} from "react"

import type {ReactElement, ReactNode} from "react"

import Description from "../../components/ShaderPage/Description"
import Overlay from "./Overlay"
import OverlayShadow from "./OverlayShadow"
import ScrollProgress from "./ScrollProgress"
import useStore from "./store"

type Props = {
	dayNumber: number
	name: string
	date: string
	accentColor: string
	shader: ReactNode
	description: ReactNode
}

const ShaderPage = ({dayNumber, name, date, accentColor, shader, description}: Props): ReactElement | null => {
	const appMode = useStore((state) => state.appMode)

	useEffect(() => {
		document.body.style.backgroundColor = appMode === `switcher` ? `#333` : accentColor
	}, [accentColor, appMode])

	if (appMode === `fullscreen`)
		return (
			<motion.div
				layoutId="canvas"
				animate={{borderRadius: `0px`}}
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
				className="fixed inset-0"
			>
				{shader}
				<OverlayShadow />
				<Overlay dayNumber={dayNumber} name={name} date={date} />
			</motion.div>
		)

	return (
		<div className="mx-auto grid h-full max-w-4xl gap-6 p-2 text-white max-md:grid-rows-[min(100vw,50vh)_auto] md:grid-cols-2 md:p-6">
			<motion.div
				layoutId="canvas"
				animate={{borderRadius: `16px`}}
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
				className="relative z-10 h-full overflow-hidden shadow-lg shadow-black/30 md:order-2 md:my-auto md:max-h-[30rem]"
			>
				<div className="absolute inset-0 overflow-hidden">{shader}</div>

				<OverlayShadow />
				<Overlay dayNumber={dayNumber} name={name} date={date} />
			</motion.div>

			<div className="grid h-full grid-cols-[2rem_1fr] overflow-hidden">
				<div className="grid place-items-center">
					<ScrollProgress />
				</div>
				<Description>{description}</Description>
			</div>
		</div>
	)
}

export default ShaderPage
