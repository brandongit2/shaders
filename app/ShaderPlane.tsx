import {OrthographicCamera} from "@react-three/drei"
import {useFrame, useThree} from "@react-three/fiber"
import {useRef} from "react"

import type {NextPage} from "next"
import type {ShaderMaterial} from "three"

import CustomShaderMaterial from "./CustomShaderMaterial"

const ShaderPlane: NextPage = () => {
	const viewport = useThree((state) => state.viewport)

	// Update time uniform
	const shaderMaterialRef = useRef<ShaderMaterial | null>(null)
	useFrame((state, delta) => {
		if (!shaderMaterialRef.current) return
		shaderMaterialRef.current.uniforms.time.value += delta
	})

	return (
		<>
			<OrthographicCamera makeDefault near={0} position={[0, 0, 5]} />

			<mesh scale={[viewport.width, viewport.height, 1]}>
				<planeGeometry />
				<customShaderMaterial
					key={CustomShaderMaterial.key}
					ref={shaderMaterialRef}
					time={0}
					pixelSizeX={1 / viewport.width}
					pixelSizeY={1 / viewport.height}
				/>
			</mesh>
		</>
	)
}

export default ShaderPlane
