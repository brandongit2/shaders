import {shaderMaterial} from "@react-three/drei"
import {extend, ReactThreeFiber} from "@react-three/fiber"
import {ShaderMaterial, Texture} from "three"
import glsl from "~/helpers/glsl"

const CustomShaderMaterial = shaderMaterial(
	{time: 0},
	glsl`
    out vec3 f_position;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      f_position = position;
    }
  `,
	glsl`
    in vec3 f_position;

    uniform float time;

    void main() {
      gl_FragColor = vec4(f_position, 1.0);
    }
  `
)

extend({CustomShaderMaterial})

declare global {
	namespace JSX {
		interface IntrinsicElements {
			customShaderMaterial: {
				time?: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default CustomShaderMaterial
