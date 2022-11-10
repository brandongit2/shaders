import {Joan} from "@next/font/google"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"

import type {ReactElement} from "react"

import Katex from "~/components/Katex"

// eslint-disable-next-line @typescript-eslint/quotes
const joan = Joan({weight: "400"})

const Description = (): ReactElement | null => {
	return (
		<ScrollArea.Root className="mr-2 overflow-hidden">
			<ScrollArea.Viewport className="h-full w-full px-2 opacity-90" style={{overflow: `scroll`}}>
				<h2
					className={clsx(
						joan.className,
						`mb-4 ml-2 mt-2 inline-block bg-white/60 py-1 pl-2 pr-8 text-xl font-bold leading-none text-[#22074A]`
					)}
				>
					Description
				</h2>
				<p className={joan.className}>
					This is a plot of the function <Katex>{`x^2 + \\frac{1}{5}\\sin(5x + t)`}</Katex> on the domain{` `}
					<Katex>{`x \\in [1, 1]`}</Katex> and range{` `}
					<span className="">
						<Katex>y \in [0.1, 1.1].</Katex>
					</span>
				</p>
			</ScrollArea.Viewport>
		</ScrollArea.Root>
	)
}

export default Description
