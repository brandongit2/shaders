import Link from "next/link"

import type {ReactElement} from "react"

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

					<div className="relative z-10 m-8 rounded-md border border-white/10 bg-black/30 p-4 text-white backdrop-blur-md">
						<ul>
							<li>
								<Link href="/simple-plot">Simple plot</Link>
							</li>
							<li>
								<Link href="/red">Red</Link>
							</li>
						</ul>
					</div>
				</div>
			</body>
		</html>
	)
}

export default RootLayout
