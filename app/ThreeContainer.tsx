"use client"

import {Canvas} from "@react-three/fiber"
import {WebGLRenderer} from "three"

import type {ReactElement} from "react"

import ShaderPlane from "./ShaderPlane"

const ThreeContainer = (): ReactElement | null => {
	return (
		<Canvas flat linear gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}>
			<ShaderPlane />
		</Canvas>
	)
}

export default ThreeContainer
