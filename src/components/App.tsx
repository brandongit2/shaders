import {OrthographicCamera} from "@react-three/drei"
import {useFrame, useThree} from "@react-three/fiber"
import {ReactElement, useRef} from "react"
import {ShaderMaterial} from "three"
import CustomShaderMaterial from "~/components/CustomShaderMaterial"

const App = (): ReactElement | null => {
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
					pixelSize={1 / viewport.width}
				/>
			</mesh>
		</>
	)
}

export default App
