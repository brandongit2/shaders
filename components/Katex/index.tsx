import katex from "katex"
import "katex/dist/katex.css"

import type {FC} from "react"

type Props = {
	children: string
	displayMode?: boolean
}

const Katex: FC<Props> = ({children, displayMode = false}) => {
	const renderedString = katex.renderToString(children, {
		output: `html`,
		displayMode,
	})

	return <span dangerouslySetInnerHTML={{__html: renderedString}} />
}

export default Katex
