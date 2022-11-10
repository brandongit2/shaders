import {Familjen_Grotesk} from "@next/font/google"
import clsx from "clsx"

import type {ReactElement} from "react"

import "./styles.css"

const font = Familjen_Grotesk()

type Props = {
	children: React.ReactNode
}

const RootLayout = ({children}: Props): ReactElement | null => {
	return (
		<html lang="en" className="h-full">
			<head>
				<title>Shaders!!</title>
			</head>
			<body className={clsx(font.className, `h-full`)}>{children}</body>
		</html>
	)
}

export default RootLayout
