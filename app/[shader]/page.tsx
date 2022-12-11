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
	const setCurrentShader = useMainStore((state) => state.setCurrentShader)
	const shader = shaderList.findIndex((shader) => shader.slug === params.shader)!

	useEffect(() => void setCurrentShader(shader), [setCurrentShader, shader])

	return <Canvas fragmentShader={shaderList[shader]!.fragmentShader} />
}

export default ShaderPage
