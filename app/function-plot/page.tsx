import type {ReactElement} from "react"

import FunctionPlot from "./FunctionPlot"
import CanvasWrapper from "components/CanvasWrapper"
import Katex from "components/Katex"
import Overlay from "components/Overlay"

const FunctionPlotPage = (): ReactElement | null => {
	return (
		<>
			<Overlay disabled>
				<CanvasWrapper>
					<FunctionPlot />
				</CanvasWrapper>
			</Overlay>

			<div className="mx-auto max-w-xl py-8">
				<h1 className="mb-2 text-2xl font-bold">Function plot</h1>
				<p>
					This is a plot of the function <Katex>{`x^2 + \\frac{1}{5}\\sin(5x + t)`}</Katex> on the domain{` `}
					<Katex>{`x \\in [1, 1]`}</Katex> and range <Katex>y \in [0.1, 1.1]</Katex>. The background is a simple
					gradient from black to white.
				</p>
			</div>
		</>
	)
}

export default FunctionPlotPage
