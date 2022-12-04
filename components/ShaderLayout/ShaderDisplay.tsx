import {motion, AnimatePresence} from "framer-motion"
import Link from "next/link"
import {BsFillCollectionFill} from "react-icons/bs"

import type {FC, ReactNode} from "react"

import useMainStore from "../../stores/useMainStore"
import {transition} from "./transition"

type Props = {
	children: ReactNode
	rounded?: boolean
}

const ShaderDisplay: FC<Props> = ({children, rounded}) => {
	const appMode = useMainStore((state) => state.appMode)
	const toggleDescription = useMainStore((state) => state.toggleDescription)
	const toggleSwitcher = useMainStore((state) => state.toggleSwitcher)
	const shader = useMainStore((state) => state.shader)

	return (
		<motion.div
			layoutId="shader-display"
			initial={false}
			transition={transition}
			className="relative isolate h-full w-full overflow-hidden"
			style={{borderRadius: rounded ? `16px` : `0px`}}
		>
			<div className="absolute inset-0">{children}</div>

			{/* Background gradient */}
			{/* <motion.div
				layout
				transition={transition}
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
			/> */}

			{/* Stuff on left */}
			{shader && (
				<motion.div layoutId="overlay-left" transition={transition} className="absolute left-8 bottom-6 z-10">
					<AnimatePresence>
						{appMode !== `switcher` && (
							<motion.div>
								<h1 className="mb-1 text-xl font-bold">
									<span className="font-normal text-white/60">Day {shader.day} | </span>
									{shader.name}
								</h1>
								<button type="button" onClick={() => void toggleDescription()} className="text-left text-sm underline">
									{appMode === `description` ? `Hide` : `Open`} description + breakdown
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}

			{/* Stuff on right */}
			{shader && (
				<motion.div
					layoutId="overlay-right"
					transition={transition}
					className="absolute bottom-6 max-sm:left-8 sm:right-8"
				>
					<AnimatePresence>
						{appMode === `fullscreen` && (
							<motion.div transition={transition}>
								<p className="text-sm text-white/50">
									By{` `}
									<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
										Brandon Tsang
									</Link>
									{` `}on {shader.date}.
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}

			<motion.div layoutId="overlay-switcher-button">
				<AnimatePresence>
					{appMode === `fullscreen` && (
						<motion.button
							layout
							transition={transition}
							type="button"
							onClick={() => void toggleSwitcher()}
							className="absolute right-8 bottom-8"
						>
							<BsFillCollectionFill size="1.5rem" />
						</motion.button>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	)
}

export default ShaderDisplay
