"use client"

import clsx from "clsx"
import {AnimatePresence, motion} from "framer-motion"
import {useEffect} from "react"

import type {ReactNode, FC} from "react"

import Description from "./description-mode/Description"
import ScrollProgress from "./description-mode/ScrollProgress"
import Overlay from "./Overlay"
import useStore from "./store"
import Switcher from "./switcher-mode/Switcher"
import {useIsBrowser} from "~/utils/useIsBrowser"

type Props = {
	children: ReactNode
}

const ShaderPage: FC<Props> = ({children}) => {
	const appMode = useStore((state) => state.appMode)
	const delayedAppMode = useStore((state) => state.delayedAppMode)
	const setDelayedAppMode = useStore((state) => state.setDelayedAppMode)
	const shader = useStore((state) => state.shader)
	const isBrowser = useIsBrowser()

	useEffect(() => {
		if (appMode === delayedAppMode) return

		if (appMode !== `fullscreen`) {
			setDelayedAppMode(appMode)
		} else {
			setTimeout(() => void setDelayedAppMode(appMode), 1000)
		}
	}, [appMode, delayedAppMode, setDelayedAppMode])

	useEffect(() => {
		document.body.style.backgroundColor = appMode === `switcher` ? `#222` : `#22074a`
	}, [appMode])

	return (
		<div
			className={clsx(
				`h-full`,
				(appMode === `description` || delayedAppMode === `description`) &&
					`mx-auto grid max-w-4xl gap-6 p-2 max-md:grid-rows-[min(100vw,50vh)_auto] md:grid-cols-2 md:p-6`,
				(appMode === `switcher` || delayedAppMode === `switcher`) && `grid place-items-center`,
			)}
		>
			<AnimatePresence custom={appMode}>
				{appMode === `fullscreen` && (
					<motion.div
						layout
						style={{position: `fixed`, inset: `0px`}}
						animate={{borderRadius: `16px`, opacity: 1}}
						exit={{borderRadius: `0px`, opacity: 0}}
						transition={{
							duration: 1,
							ease: [0.65, 0, 0.35, 1],
							opacity: {delay: 1},
						}}
						className={clsx(
							`relative z-10 h-full overflow-hidden shadow-lg shadow-black/30`,
							appMode === `description` && `md:order-2 md:my-auto md:max-h-[30rem]`,
							appMode === `switcher` && `pointer-events-none h-[min(50vw,30rem)] w-[min(50vw,30rem)]`,
						)}
					>
						<div className="absolute inset-0 overflow-hidden">{children}</div>

						<Overlay />
					</motion.div>
				)}
			</AnimatePresence>

			{/* BEGIN DESCRIPTION STUFF */}

			{/* Take the canvas' place when it's animating to fullscreen */}
			{appMode === `fullscreen` && delayedAppMode === `description` && <div className="md:order-2" />}

			{delayedAppMode === `description` && (
				<div className="grid h-full grid-cols-[2rem_1fr] overflow-hidden">
					<div className="grid place-items-center">
						<ScrollProgress />
					</div>
					{shader && <Description>{shader.description}</Description>}
				</div>
			)}

			{/* BEGIN SWITCHER STUFF */}

			{delayedAppMode === `switcher` && isBrowser && (
				<div className="absolute">
					<Switcher />
				</div>
			)}
		</div>
	)
}

export default ShaderPage
