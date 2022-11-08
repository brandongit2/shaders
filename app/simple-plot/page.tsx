"use client"

import {Canvas} from "@react-three/fiber"
import {WebGLRenderer} from "three"

import type {ReactElement} from "react"

import SimplePlot from "./SimplePlot"

const SimplePlotPage = (): ReactElement | null => {
	return (
		<Canvas flat linear gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}>
			<SimplePlot />
		</Canvas>
	)
}

export default SimplePlotPage
