import type {ReactElement} from "react"

import FunctionPlot from "./FunctionPlot"
import CanvasWrapper from "components/CanvasWrapper"
import ShaderPage from "components/ShaderPage"

const FunctionPlotPage = (): ReactElement | null => {
	return (
		<ShaderPage day={1} shaderName="Function plot" date="9 Nov 2022">
			<CanvasWrapper>
				<FunctionPlot />
			</CanvasWrapper>
		</ShaderPage>
	)
}

export default FunctionPlotPage
