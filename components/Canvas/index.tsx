"use client"

import useResizeObserver from "@react-hook/resize-observer"
import {useCallback, useEffect, useRef, useState} from "react"
import {useDebounce} from "react-use"

import type {ReactElement} from "react"

import vertexShaderSource from "./vertexShaderSource"

type Props = {
	fragmentShader: string
}

const Canvas = ({fragmentShader: fragmentShaderSource}: Props): ReactElement | null => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const shaderProgramRef = useRef<WebGLProgram | null>(null)
	const [contentRect, setContentRect] = useState<DOMRectReadOnly | null>(null)

	useResizeObserver(canvasRef, (rect) => void setContentRect(rect.contentRect))

	// Set up WebGL 2 on the canvas upon mount
	const canvasCallback = useCallback(
		(canvas: HTMLCanvasElement | null) => {
			if (!canvas) return
			canvasRef.current = canvas

			const gl = canvas.getContext(`webgl2`)
			if (!gl) return

			// Create the vertex shader
			const vertexShader = gl.createShader(gl.VERTEX_SHADER)
			if (!vertexShader) return
			gl.shaderSource(vertexShader, vertexShaderSource)
			gl.compileShader(vertexShader)
			if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
				console.error(gl.getShaderInfoLog(vertexShader))
				gl.deleteShader(vertexShader)
			}

			// Create the fragment shader
			const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
			if (!fragmentShader) return
			gl.shaderSource(fragmentShader, fragmentShaderSource)
			gl.compileShader(fragmentShader)
			if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
				console.error(gl.getShaderInfoLog(fragmentShader))
				gl.deleteShader(fragmentShader)
			}

			// Create and link the shader program
			const shaderProgram = gl.createProgram()
			if (!shaderProgram) return
			shaderProgramRef.current = shaderProgram
			gl.attachShader(shaderProgram, vertexShader)
			gl.attachShader(shaderProgram, fragmentShader)
			gl.linkProgram(shaderProgram)
			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				console.error(gl.getProgramInfoLog(shaderProgram))
				gl.deleteProgram(shaderProgram)
			}
			gl.useProgram(shaderProgram)

			// Put vertex positions in a buffer
			const positionBuffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
			const positions = [-1, 1, 1, 1, -1, -1, 1, -1] // Full-screen rectangle
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

			const positionAttributeLocation = gl.getAttribLocation(shaderProgram, `v_position`)
			const vao = gl.createVertexArray()
			gl.bindVertexArray(vao)
			gl.enableVertexAttribArray(positionAttributeLocation)
			gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
		},
		[fragmentShaderSource]
	)

	// Update canvas resolution. Debounced for performance.
	useDebounce(
		() => {
			if (!canvasRef.current || !contentRect) return
			const canvas = canvasRef.current

			canvas.width = (contentRect.width || 0) * devicePixelRatio
			canvas.height = (contentRect.height || 0) * devicePixelRatio
		},
		100,
		[contentRect]
	)

	// Render loop
	useEffect(() => {
		const gl = canvasRef.current?.getContext(`webgl2`)
		if (!gl || !contentRect) return

		let animationFrame: number
		const animate: FrameRequestCallback = (time) => {
			const shaderProgram = shaderProgramRef.current
			if (!shaderProgram) return

			// Clear everything before draw
			gl.clearColor(0, 0, 0, 0)
			gl.clear(gl.COLOR_BUFFER_BIT)
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

			// Uniforms
			gl.uniform1f(gl.getUniformLocation(shaderProgram, `time`), time * 0.001)
			gl.uniform1f(gl.getUniformLocation(shaderProgram, `pixelSizeX`), 1 / contentRect.width / devicePixelRatio)
			gl.uniform1f(gl.getUniformLocation(shaderProgram, `pixelSizeY`), 1 / contentRect.height / devicePixelRatio)

			// Draw the rectangle
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

			animationFrame = requestAnimationFrame(animate)
		}
		animationFrame = requestAnimationFrame(animate)

		return () => void cancelAnimationFrame(animationFrame)
	}, [contentRect])

	return <canvas ref={canvasCallback} className="h-full w-full" />
}

export default Canvas
