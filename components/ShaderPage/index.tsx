"use client"

import clsx from "clsx"
import {motion} from "framer-motion"
import Link from "next/link"
import {useEffect, useState} from "react"

import type {ReactElement, ReactNode} from "react"

export type Props = {
	children: ReactNode
	day: number
	shaderName: string
	date: string
}

const ShaderPage = ({children, day, shaderName, date}: Props): ReactElement | null => {
	const [detailsOpen, setDetailsOpen] = useState(false)

	useEffect(() => {
		const toggleDetailsButton = document.querySelector(`#toggle-description-button`)
		if (!toggleDetailsButton) return

		const onToggleDetails = () => {
			setDetailsOpen((v) => !v)
		}

		toggleDetailsButton.addEventListener(`click`, onToggleDetails)
		return () => void toggleDetailsButton.removeEventListener(`click`, onToggleDetails)
	}, [])

	return (
		<div className="grid h-full place-items-center">
			<motion.div
				layout
				style={{width: detailsOpen ? `80%` : `100%`, height: detailsOpen ? `80%` : `100%`}}
				// transition={{duration: 100, ease: `easeInOut`}}
				className={clsx(
					`absolute overflow-hidden text-white transition-[border-radius] duration-1000`,
					detailsOpen && `rounded-xl`
				)}
			>
				<div className="absolute inset-0">{children}</div>

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

				<motion.div layout className="flex h-full w-full items-end justify-between p-8">
					<div className="translate-y-1">
						<h1 className="mb-1 text-xl font-bold">
							<span className="font-normal opacity-80">Day {day} | </span>
							{shaderName}
						</h1>
						<button type="button" className="text-sm underline" id="toggle-description-button">
							{detailsOpen ? `Hide` : `Open`} description + breakdown
						</button>
					</div>

					<p className="text-sm opacity-50">
						By{` `}
						<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
							Brandon Tsang
						</Link>
						{` `}on {date}.
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}

export default ShaderPage
