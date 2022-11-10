import glsl from "helpers/glsl"

const vertexShaderSource = glsl`#version 300 es

  in vec4 v_position;

  out vec2 f_uv;

  void main() {
    gl_Position = v_position;
    f_uv = v_position.xy * 0.5 + 0.5;
  }
`

export default vertexShaderSource
