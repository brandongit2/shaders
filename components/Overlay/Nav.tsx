"use client"

import clsx from "clsx"
import {AnimatePresence, motion} from "framer-motion"
import Link from "next/link"
import {useEffect, useState} from "react"

import type {ReactElement} from "react"

import Icon from "components/Icon"

const Nav = (): ReactElement | null => {
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		const onClick = (evt: MouseEvent) => {
			if (!evt.target || !(evt.target as HTMLElement).closest(`#nav-box`)) {
				setIsExpanded(false)
			}
		}

		document.body.addEventListener(`click`, onClick)
		return () => void document.body.removeEventListener(`click`, onClick)
	}, [])

	return (
		<div id="nav-box" className="rounded-md border border-white/10 bg-black/30 text-white backdrop-blur-md">
			<div className="p-4">
				<button
					type="button"
					onClick={() => void setIsExpanded((v) => !v)}
					className="flex items-center justify-between gap-4"
				>
					<p className="font-bold">Other shaders</p>
					<div className={clsx(`transition-transform`, !isExpanded && `rotate-180`)}>
						<Icon>expand_more</Icon>
					</div>
				</button>
				<AnimatePresence>
					{isExpanded && (
						<motion.ul
							initial={{height: `0px`}}
							animate={{height: `auto`}}
							exit={{height: `0px`}}
							className="ml-1 flex flex-col gap-0.5 overflow-hidden text-sm"
						>
							<div className="h-1" /> {/* For spacing */}
							<li className="underline">
								<Link href="/function-plot/">Function plot</Link>
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default Nav
