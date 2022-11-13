"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import {useEffect} from "react"
import shallow from "zustand/shallow"

import type {ReactElement, ReactNode} from "react"

import Description from "../../components/ShaderPage/Description"
import Overlay from "./Overlay"
import ScrollProgress from "./ScrollProgress"
import useStore from "./store"
import Switcher from "./Switcher"

type Props = {
	dayNumber: number
	name: string
	date: string
	accentColor: string
	shader: ReactNode
	description: ReactNode
	image: ReactNode
}

const ShaderPage = ({dayNumber, name, date, accentColor, shader, description, image}: Props): ReactElement | null => {
	const {appMode, delayedAppMode, setDelayedAppMode} = useStore(
		(state) => ({
			appMode: state.appMode,
			delayedAppMode: state.delayedAppMode,
			setDelayedAppMode: state.setDelayedAppMode,
		}),
		shallow,
	)

	useEffect(() => {
		if (appMode === delayedAppMode) return

		if (appMode !== `fullscreen`) {
			setDelayedAppMode(appMode)
		} else {
			setTimeout(() => {
				setDelayedAppMode(appMode)
			}, 1000)
		}
	}, [appMode, delayedAppMode, setDelayedAppMode])

	useEffect(() => {
		document.body.style.backgroundColor = appMode === `switcher` ? `#333` : accentColor
	}, [accentColor, appMode])

	return (
		<div
			className={clsx(
				`h-full`,
				(appMode === `description` || delayedAppMode === `description`) &&
					`mx-auto grid max-w-4xl gap-6 p-2 max-md:grid-rows-[min(100vw,50vh)_auto] md:grid-cols-2 md:p-6`,
				(appMode === `switcher` || delayedAppMode === `switcher`) && `grid place-items-center`,
			)}
		>
			<motion.div
				layout
				style={appMode === `fullscreen` ? {position: `fixed`, inset: `0px`} : {}}
				animate={{borderRadius: appMode === `fullscreen` ? `0px` : `16px`, opacity: appMode === `switcher` ? 0 : 1}}
				transition={{
					duration: 1,
					ease: [0.65, 0, 0.35, 1],
					opacity: {delay: 1, transitionEnd: {pointerEvents: appMode === `switcher` ? `none` : `unset`}},
				}}
				className={clsx(
					`relative z-10 h-full overflow-hidden shadow-lg shadow-black/30`,
					appMode === `description` && `md:order-2 md:my-auto md:max-h-[30rem]`,
					appMode === `switcher` && `pointer-events-none h-[min(50vw,30rem)] w-[min(50vw,30rem)]`,
				)}
			>
				<div className="absolute inset-0 overflow-hidden">{shader}</div>

				<Overlay dayNumber={dayNumber} name={name} date={date} />
			</motion.div>

			{/* BEGIN DESCRIPTION STUFF */}

			{/* Take the canvas' place when it's animating to fullscreen */}
			{appMode === `fullscreen` && delayedAppMode === `description` && <div className="md:order-2" />}

			{delayedAppMode === `description` && (
				<div className="grid h-full grid-cols-[2rem_1fr] overflow-hidden">
					<div className="grid place-items-center">
						<ScrollProgress />
					</div>
					<Description>{description}</Description>
				</div>
			)}

			{/* BEGIN SWITCHER STUFF */}

			{delayedAppMode === `switcher` && <Switcher />}
		</div>
	)
}

export default ShaderPage
