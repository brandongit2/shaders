import glsl from "helpers/glsl"

export const colorful = glsl`#version 300 es
	precision highp float;

	in vec2 f_uv;

	out vec4 fragColor;

	uniform float time;
	uniform float pixelSizeX;
	uniform float pixelSizeY;

	void main() {
		fragColor = vec4(f_uv.x, f_uv.y, f_uv.y - f_uv.x, 1.0);
	}
`
