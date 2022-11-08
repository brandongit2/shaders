"use client"

import {Canvas} from "@react-three/fiber"
import {WebGLRenderer} from "three"

import type {ReactElement} from "react"

import Red from "./Red"

const RedPage = (): ReactElement | null => {
	return (
		<Canvas flat linear gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}>
			<Red />
		</Canvas>
	)
}

export default RedPage
