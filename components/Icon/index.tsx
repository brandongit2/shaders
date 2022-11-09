import localFont from "@next/font/local"
import clsx from "clsx"

import type {ReactElement} from "react"

// eslint-disable-next-line @typescript-eslint/quotes
const materialSymbols = localFont({src: "./material-symbols.woff2", weight: "100 700"})

type Props = {
	children: string
	size?: string
}

const Icon = ({children, size}: Props): ReactElement | null => {
	return (
		<span className={clsx(`font-bold`, materialSymbols.className)} style={{fontSize: size ?? `1rem`}}>
			{children}
		</span>
	)
}

export default Icon
