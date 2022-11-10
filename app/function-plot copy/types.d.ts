declare global {
	namespace JSX {
		interface IntrinsicElements {
			functionPlotMaterial: {
				time: number
				pixelSizeX: number
				pixelSizeY: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export {}
