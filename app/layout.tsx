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
			<body className="h-full">{children}</body>
		</html>
	)
}

export default RootLayout
