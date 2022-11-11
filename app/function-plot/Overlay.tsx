import Link from "next/link"

import type {ReactElement} from "react"

type Props = {
	areDetailsOpen: boolean
	setAreDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Overlay = ({areDetailsOpen, setAreDetailsOpen}: Props): ReactElement | null => {
	return (
		<div className="absolute left-0 bottom-0 flex w-full flex-col justify-between gap-4 px-8 pb-6">
			<div>
				<h1 className="mb-1 text-xl font-bold">
					<span className="font-normal text-white/60">Day 1 | </span>
					Function plot
				</h1>
				<button type="button" onClick={() => void setAreDetailsOpen((v) => !v)} className="text-left text-sm underline">
					{areDetailsOpen ? `Hide` : `Open`} description + breakdown
				</button>
			</div>

			{!areDetailsOpen && (
				<p className="text-sm opacity-50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					{` `}on 10 Nov 2022.
				</p>
			)}
		</div>
	)
}

export default Overlay
