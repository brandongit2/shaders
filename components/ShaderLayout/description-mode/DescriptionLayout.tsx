"use client"

import invariant from "ts-invariant"

import type {FC, ReactNode} from "react"

import Description from "./Description"
import ScrollProgress from "./ScrollProgress"
import shaderList from "~/shaders/shaderList"
import useMainStore from "~/stores/useMainStore"

type Props = {
	children: ReactNode
}

const DescriptionLayout: FC<Props> = ({children}) => {
	const currentShaderIndex = useMainStore((state) => state.currentShaderIndex)
	invariant(currentShaderIndex !== null, `currentShaderIndex is null`)
	const currentShader = shaderList[currentShaderIndex]!

	return (
		<div className="mx-auto grid h-full max-w-4xl gap-6 p-2 max-md:grid-rows-[min(100vw,50vh)_auto] md:grid-cols-2 md:p-6">
			<div className="relative z-10 h-full md:order-2 md:my-auto md:max-h-[30rem]">{children}</div>

			<div className="grid h-full grid-cols-[2rem_1fr] overflow-hidden">
				<div className="grid place-items-center">
					<ScrollProgress />
				</div>
				<Description>{currentShader.description}</Description>
			</div>
		</div>
	)
}

export default DescriptionLayout
