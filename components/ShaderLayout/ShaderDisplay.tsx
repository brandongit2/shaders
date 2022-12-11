"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import Link from "next/link"
import {BsFillCollectionFill} from "react-icons/bs"
import invariant from "ts-invariant"

import type {FC, ReactNode} from "react"

import useMainStore from "../../stores/useMainStore"
import {transition} from "./transition"
import shaderList from "~/shaders/shaderList"

type Props = {
	children: ReactNode
	rounded?: boolean
	hideAuthor?: boolean
}

const ShaderDisplay: FC<Props> = ({children, rounded = false, hideAuthor = false}) => {
	const appMode = useMainStore((state) => state.appMode)
	const beginTransition = useMainStore((state) => state.beginTransition)
	const currentShaderIndex = useMainStore((state) => state.currentShaderIndex)
	invariant(currentShaderIndex !== null, `ShaderDisplay: currentShaderIndex is null`)

	const currentShader = shaderList[currentShaderIndex]!
	return (
		<motion.div
			layoutId={`shader-display-${currentShaderIndex}`}
			transition={transition}
			className="relative isolate h-full w-full overflow-hidden"
			style={{borderRadius: rounded ? `16px` : `0px`}}
		>
			<div className="absolute inset-0">{children}</div>

			{/* Background gradient */}
			<motion.div
				layoutId={`overlay-gradient-${currentShaderIndex}`}
				initial={false}
				animate={{opacity: appMode === `switcher` ? 0 : 1}}
				transition={transition}
				className="absolute bottom-0 left-0 right-0 h-36"
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

			{/* Stuff on left */}
			<motion.div
				layoutId={`overlay-left-${currentShaderIndex}`}
				initial={false}
				animate={{opacity: appMode === `switcher` ? 0 : 1}}
				transition={transition}
				className={clsx(`absolute left-8 z-10 h-max w-max`, hideAuthor ? `bottom-8` : `bottom-16 md:bottom-8`)}
			>
				<h1 className="mb-1 text-xl font-bold">
					<span className="font-normal text-white/60">Day {currentShader.day} | </span>
					{currentShader.name}
				</h1>
				<button
					type="button"
					onClick={() => void beginTransition(appMode === `description` ? `fullscreen` : `description`)}
					className="text-left text-sm underline"
				>
					{appMode === `description` ? `Hide` : `Open`} description + breakdown
				</button>
			</motion.div>

			{/* Stuff on right */}
			<motion.div
				layoutId={`overlay-right-${currentShader.slug}`}
				initial={false}
				animate={{opacity: appMode === `fullscreen` ? 1 : 0}}
				transition={transition}
				className="absolute bottom-8 h-12 w-72 max-sm:left-8 sm:right-8"
			>
				<div className="absolute bottom-0 h-max w-max max-sm:left-0 sm:right-0">
					<p className="text-sm text-white/50">
						By{` `}
						<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
							Brandon Tsang
						</Link>
						{` `}on {currentShader.date}.
					</p>
				</div>
			</motion.div>

			<motion.div
				layoutId={`overlay-switcher-button-${currentShader.slug}`}
				initial={false}
				animate={{opacity: appMode === `fullscreen` ? 1 : 0}}
				transition={transition}
				onClick={() => void beginTransition(`switcher`)}
				className="absolute right-8 bottom-8 h-16 w-16 sm:bottom-16"
			>
				<button type="button" className="absolute bottom-0 right-0 h-max w-max">
					<BsFillCollectionFill size="1.5rem" />
				</button>
			</motion.div>
		</motion.div>
	)
}

export default ShaderDisplay
