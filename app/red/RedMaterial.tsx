import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"

import glsl from "helpers/glsl"

const RedMaterial = shaderMaterial(
	{},
	glsl`
    out vec2 f_uv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      f_uv = uv;
    }
  `,
	glsl`
    in vec2 f_uv;

    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
)

extend({RedMaterial})

export default RedMaterial
