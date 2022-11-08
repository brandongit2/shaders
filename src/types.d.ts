declare global {
	namespace JSX {
		interface IntrinsicElements {
			customShaderMaterial: {
				time: number
				pixelSizeX: number
				pixelSizeY: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export {}
