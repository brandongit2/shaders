import {Familjen_Grotesk} from "@next/font/google"
import clsx from "clsx"
import Link from "next/link"

import type {ReactElement} from "react"

import Nav from "./Nav"
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
			<body className={clsx(font.className, `h-full`)}>
				<div className="grid h-full items-end">
					<div className="absolute inset-0">{children}</div>

					<div className="relative z-10 m-8 mt-0 flex items-end justify-between">
						<Nav />
						<p className="text-sm text-white text-opacity-50">
							By{` `}
							<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
								Brandon Tsang
							</Link>
							.
						</p>
					</div>
				</div>
			</body>
		</html>
	)
}

export default RootLayout
