"use client"

import {Familjen_Grotesk} from "@next/font/google"
import clsx from "clsx"
import {useEffect} from "react"

import type {ReactNode, FC} from "react"

import "./styles.css"
import ShaderLayout from "~/components/ShaderLayout"
import {transition} from "~/components/ShaderLayout/transition"
import useMainStore from "~/stores/useMainStore"
import "~/utils/logger-dev-only"

const font = Familjen_Grotesk()

type Props = {
	children: ReactNode
}

const RootLayout: FC<Props> = ({children}) => {
	const setScreenWidth = useMainStore((state) => state.setScreenWidth)
	useEffect(() => {
		const updateScreenWidth = () => void setScreenWidth(window.innerWidth)
		updateScreenWidth()

		window.addEventListener(`resize`, updateScreenWidth)
		return () => void window.removeEventListener(`resize`, updateScreenWidth)
	}, [setScreenWidth])

	const appMode = useMainStore((state) => state.appMode)

	return (
		<html lang="en" className={clsx(font.className, `h-full`)}>
			<head>
				<title>Shaders!!</title>

				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body
				className="h-full text-white transition-[background-color]"
				style={{background: appMode === `switcher` ? `#222` : `#22074a`, transitionDuration: `${transition.duration}s`}}
			>
				<ShaderLayout>{children}</ShaderLayout>
			</body>
		</html>
	)
}

export default RootLayout
