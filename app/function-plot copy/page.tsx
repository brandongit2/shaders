import type {ReactElement} from "react"

import FunctionPlot from "./FunctionPlot"
import Canvas from "components/Canvas"
import ShaderPage from "components/ShaderPage"

const FunctionPlotPage = (): ReactElement | null => {
	return (
		<ShaderPage day={1} shaderName="Function plot" date="9 Nov 2022">
			<Canvas>
				<FunctionPlot />
			</Canvas>
		</ShaderPage>
	)
}

export default FunctionPlotPage
