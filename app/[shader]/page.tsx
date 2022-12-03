"use client"

import {useEffect} from "react"

import type {FC} from "react"

import {fragmentShader} from "./shader"
import Canvas from "~/components/Canvas"
import shaderList from "~/components/ShaderPage/shaderList"
import useStore from "~/components/ShaderPage/store"

export const generateStaticParams = async () => shaderList.map((shader) => shader.slug)

type Props = {
	params: {shader: string}
}

const ShaderPage: FC<Props> = ({params}) => {
	const setShader = useStore((state) => state.setShader)
	const shader = shaderList.find((shader) => shader.slug === params.shader)!
	useEffect(() => void setShader(shader), [setShader, shader])

	return <Canvas fragmentShader={fragmentShader} />
}

export default ShaderPage
