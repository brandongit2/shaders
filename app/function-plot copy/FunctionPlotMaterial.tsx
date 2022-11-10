import {shaderMaterial} from "@react-three/drei"
import {extend} from "@react-three/fiber"

import glsl from "helpers/glsl"

const FunctionPlotMaterial = shaderMaterial(
	{time: 0, pixelSizeX: 1, pixelSizeY: 1},
	glsl`
    out vec2 f_uv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      f_uv = uv;
    }
  `,
	glsl`
    in vec2 f_uv;

    uniform float time;
    uniform float pixelSizeX;
    uniform float pixelSizeY;

    float fn(float x) {
      return x * x + sin((x + time / 3.0) * 5.0) / 5.0 + 0.1;
    }

    const vec3 plotColor = vec3(1.0, 0.0, 0.0);
    const float plotThickness = 16.0;

    void main() {
      bool paint = false;
      float pixelAspect = pixelSizeX / pixelSizeY;

      float x = f_uv.x - (plotThickness * pixelSizeX) / 2.0;
      while (x < f_uv.x + (plotThickness * pixelSizeX) / 2.0) {
        float y = fn(x);
        if (
          distance(vec2(x, y * pixelAspect), vec2(f_uv.x, f_uv.y * pixelAspect))
          < (plotThickness * pixelSizeX) / 2.0
        ) paint = true;

        x += pixelSizeX / 2.0;
      }

      gl_FragColor = paint ? vec4(plotColor, 1.0) : vec4(1.0, 0.0, 1.0, 1.0);
    }
  `
)

extend({FunctionPlotMaterial})

export default FunctionPlotMaterial
