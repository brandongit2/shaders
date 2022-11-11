import clsx from "clsx"
import {motion} from "framer-motion"
import Link from "next/link"

import type {ReactElement} from "react"

type Props = {
	areDetailsOpen: boolean
	setAreDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Overlay = ({areDetailsOpen, setAreDetailsOpen}: Props): ReactElement | null => {
	return (
		<>
			<motion.div
				layout
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
				className={clsx(`absolute left-8`, areDetailsOpen ? `bottom-6` : `bottom-14 sm:bottom-6`)}
			>
				<h1 className="mb-1 text-xl font-bold">
					<span className="font-normal text-white/60">Day 1 | </span>
					Function plot
				</h1>
				<button type="button" onClick={() => void setAreDetailsOpen((v) => !v)} className="text-left text-sm underline">
					{areDetailsOpen ? `Hide` : `Open`} description + breakdown
				</button>
			</motion.div>

			<motion.div
				layout
				transition={{duration: 1, ease: [0.65, 0, 0.35, 1], opacity: {duration: 0.6, delay: areDetailsOpen ? 0 : 0.4}}}
				animate={{opacity: areDetailsOpen ? 0 : 1}}
				className={clsx(`absolute left-8 bottom-6 sm:left-auto sm:right-8`, areDetailsOpen && `pointer-events-none`)}
			>
				<p className="text-sm text-white/50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					{` `}on 10 Nov 2022.
				</p>
			</motion.div>
		</>
	)
}

export default Overlay
