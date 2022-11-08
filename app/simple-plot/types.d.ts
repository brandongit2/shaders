declare global {
	namespace JSX {
		interface IntrinsicElements {
			simplePlotMaterial: {
				time: number
				pixelSizeX: number
				pixelSizeY: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export {}
