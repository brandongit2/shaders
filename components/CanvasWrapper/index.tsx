"use client"

import {MotionCanvas} from "framer-motion-3d"
import {WebGLRenderer} from "three"

import type {ReactElement, ReactNode} from "react"

type Props = {
	children: ReactNode
}

const CanvasWrapper = ({children}: Props): ReactElement | null => {
	return (
		<MotionCanvas
			flat
			linear
			gl={(canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined})}
		>
			{children}
		</MotionCanvas>
	)
}

export default CanvasWrapper
