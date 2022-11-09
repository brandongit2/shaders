import Link from "next/link"

import type {ReactElement} from "react"

import Nav from "./Nav"
import "./styles.css"

type Props = {
	children: React.ReactNode
}

const RootLayout = ({children}: Props): ReactElement | null => {
	return (
		<html lang="en" className="h-full">
			<head>
				<title>Shaders!!</title>
			</head>
			<body className="h-full">
				<div className="flex h-full items-end justify-start">
					<div className="absolute inset-0">{children}</div>

					<Nav />
				</div>
			</body>
		</html>
	)
}

export default RootLayout
