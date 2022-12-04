import glsl from "helpers/glsl"

export const functionPlot = glsl`#version 300 es
	precision highp float;

	in vec2 f_uv;

	out vec4 fragColor;

	uniform float time;
	uniform float pixelSizeX;
	uniform float pixelSizeY;

	float fn(float x) {
		return x * x + sin((x + time / 3.0) * 5.0) / 5.0 + 0.1;
	}

	const vec3 plotColor = vec3(1.0, 0.7, 0.1);
	const float plotThickness = 20.0;

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

		fragColor = paint ? vec4(plotColor, 1.0) : vec4(f_uv.x / 7.0 + 0.2, 0.0, f_uv.x * 0.1 + f_uv.y * 0.5, 1.0);
	}
`
