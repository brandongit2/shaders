import Link from "next/link"

import type {ReactElement, ReactNode} from "react"

type Props = {
	children: ReactNode
	day: number
	shaderName: string
	date: string
}

const Overlay = ({children, day, shaderName, date}: Props): ReactElement | null => {
	return (
		<div className="grid h-full items-end text-white">
			<div className="absolute inset-0">{children}</div>

			<div
				className="absolute bottom-0 left-0 h-28 w-full"
				style={{
					backgroundImage: `
						linear-gradient(0deg, rgb(0% 0% 0% / 0.78) 0%, rgb(0% 0% 0% / 0.7725062593572599) 6.25%, rgb(0% 0% 0% / 0.7503130176794018) 12.5%, rgb(0% 0% 0% / 0.7142731487979926) 18.75%, rgb(0% 0% 0% / 0.6657716446627535) 25%, rgb(0% 0% 0% / 0.6066723908776449) 31.25%, rgb(0% 0% 0% / 0.539246538622385) 37.5%, rgb(0% 0% 0% / 0.46608522558629006) 43.75%, rgb(0% 0% 0% / 0.39000000000000007) 50%, rgb(0% 0% 0% / 0.31391477441371) 56.25%, rgb(0% 0% 0% / 0.2407534613776151) 62.5%, rgb(0% 0% 0% / 0.17332760912235523) 68.75%, rgb(0% 0% 0% / 0.11422835533724651) 75%, rgb(0% 0% 0% / 0.06572685120200727) 81.25%, rgb(0% 0% 0% / 0.029686982320598188) 87.5%, rgb(0% 0% 0% / 0.00749374064274011) 93.75%, rgb(0% 0% 0% / 0) 100% )
					`,
				}}
			/>

			<div className="relative z-10 m-8 mt-0 flex items-end justify-between">
				<div className="translate-y-1">
					<h1 className="mb-1 text-xl font-bold">
						<span className="font-normal opacity-80">Day {day} | </span>
						{shaderName}
					</h1>
					<p className="text-sm underline">See description + breakdown</p>
				</div>

				<p className="text-sm opacity-50">
					By{` `}
					<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
						Brandon Tsang
					</Link>
					{` `}on {date}.
				</p>
			</div>
		</div>
	)
}

export default Overlay
