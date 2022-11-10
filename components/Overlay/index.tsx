import clsx from "clsx"
import Link from "next/link"

import type {ReactElement, ReactNode} from "react"

import Nav from "./Nav"

type Props = {
	children: ReactNode
	disabled?: boolean
}

const Overlay = ({children, disabled}: Props): ReactElement | null => {
	return (
		<div className="grid h-full items-end">
			<div className="absolute inset-0">{children}</div>

			<div className={clsx(`relative z-10 m-8 mt-0 flex items-end justify-between`, disabled && `hidden`)}>
				<Nav />
				<p className="text-sm text-white text-opacity-50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					.
				</p>
			</div>
		</div>
	)
}

export default Overlay
