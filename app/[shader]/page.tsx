"use client"

import {useEffect} from "react"

import type {FC} from "react"

import Canvas from "~/components/Canvas"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

export const generateStaticParams = async () => shaderList.map((shader) => shader.slug)

type Props = {
	params: {shader: string}
}

const ShaderPage: FC<Props> = ({params}) => {
	const setShader = useMainStore((state) => state.setShader)
	const shader = shaderList.find((shader) => shader.slug === params.shader)!

	useEffect(() => {
		setShader(shader)
	}, [setShader, shader])

	return <Canvas fragmentShader={shader.fragmentShader} />
}

export default ShaderPage
