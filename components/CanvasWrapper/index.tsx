"use client"

import {Canvas} from "@react-three/fiber"
import {WebGLRenderer} from "three"

import type {ReactElement, ReactNode} from "react"

type Props = {
	children: ReactNode
}

const CanvasWrapper = ({children}: Props): ReactElement | null => {
	return (
		<Canvas flat linear gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}>
			{children}
		</Canvas>
	)
}

export default CanvasWrapper
