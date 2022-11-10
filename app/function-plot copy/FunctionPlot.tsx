"use client"

import {useFrame, useThree} from "@react-three/fiber"
import {LayoutOrthographicCamera, motion as motion3d} from "framer-motion-3d"
import {useRef} from "react"

import type {ReactElement} from "react"
import type {ShaderMaterial} from "three"

import FunctionPlotMaterial from "./FunctionPlotMaterial"

const FunctionPlot = (): ReactElement | null => {
	const viewport = useThree((state) => state.viewport)

	// Update time uniform
	const ref = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!ref.current || !ref.current.uniforms.time) return
		ref.current.uniforms.time.value += delta
	})

	return (
		<>
			<LayoutOrthographicCamera makeDefault near={0} position={[0, 0, 5]} />

			{/* <mesh scale={[viewport.width, viewport.height, 1]}>
				<planeBufferGeometry />
				<functionPlotMaterial
					key={FunctionPlotMaterial.key}
					ref={ref}
					time={0}
					pixelSizeX={1 / viewport.width}
					pixelSizeY={1 / viewport.height}
				/>
			</mesh> */}
		</>
	)
}

export default FunctionPlot
