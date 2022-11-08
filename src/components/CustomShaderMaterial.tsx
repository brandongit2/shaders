import {shaderMaterial} from "@react-three/drei"
import {extend, ReactThreeFiber} from "@react-three/fiber"
import {ShaderMaterial, Texture} from "three"
import glsl from "~/helpers/glsl"

const CustomShaderMaterial = shaderMaterial(
	{time: 0, pixelSize: 1},
	glsl`
    out vec3 f_position;
    out vec2 f_uv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      f_position = position;
      f_uv = uv;
    }
  `,
	glsl`
    in vec3 f_position;
    in vec2 f_uv;

    uniform float time;
    uniform float pixelSize;

    float plot(float x) {
      return pow(1.5 * x, 19.0) + sin(x * 5.0) / 5.0;
    }

    const vec3 plotColor = vec3(1.0, 0.0, 0.0);
    const float plotWidth = 16.0;

    void main() {
      vec2 position = f_position.xy * 2.0;
      float realPlotWidth = plotWidth * pixelSize;
      bool paint = false;

      float j = position.x - realPlotWidth / 2.0;
      if (distance(position, vec2(j, plot(j))) < realPlotWidth / 2.0) {
        paint = true;
      }

      for (int i = 1; i < int(ceil(plotWidth)) + 1; i++) {
        j += pixelSize;
        if (distance(position, vec2(j, plot(j))) < realPlotWidth / 2.0) {
          paint = true;
        }
      }

      gl_FragColor = paint ? vec4(plotColor, 1.0) : vec4(vec3((position.x + 1.0) / 2.0), 1.0);
    }
  `
)

extend({CustomShaderMaterial})

declare global {
	namespace JSX {
		interface IntrinsicElements {
			customShaderMaterial: {
				time: number
				pixelSize: number
			} & JSX.IntrinsicElements["shaderMaterial"]
		}
	}
}

export default CustomShaderMaterial
