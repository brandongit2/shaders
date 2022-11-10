"use client"

import type {ReactElement} from "react"

import Canvas from "components/Canvas"
import glsl from "helpers/glsl"

const FunctionPlot = (): ReactElement | null => {
	return (
		<Canvas
			fragmentShader={glsl`#version 300 es

				precision highp float;

				in vec2 f_uv;

				out vec4 fragColor;

				void main() {
					fragColor = vec4(f_uv.x, f_uv.y, 0.0, 1.0);
				}
			`}
		/>
	)
}

export default FunctionPlot
