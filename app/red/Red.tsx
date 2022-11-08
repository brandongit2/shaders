"use client"

import {OrthographicCamera} from "@react-three/drei"
import {useFrame, useThree} from "@react-three/fiber"
import {useRef} from "react"

import type {ReactElement} from "react"
import type {ShaderMaterial} from "three"

import RedMaterial from "./RedMaterial"

const Red = (): ReactElement | null => {
	const viewport = useThree((state) => state.viewport)

	// Update time uniform
	const ref = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!ref.current || !ref.current.uniforms.time) return
		ref.current.uniforms.time.value += delta
	})

	return (
		<>
			<OrthographicCamera makeDefault near={0} position={[0, 0, 5]} />

			<mesh scale={[viewport.width, viewport.height, 1]}>
				<planeGeometry />
				<redMaterial ref={ref} key={RedMaterial.key} />
			</mesh>
		</>
	)
}

export default Red
