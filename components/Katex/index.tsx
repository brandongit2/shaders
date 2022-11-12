import katex from "katex"
import "katex/dist/katex.css"

import type {ReactElement} from "react"

type Props = {
	children: string
	displayMode?: boolean
}

const Katex = ({children, displayMode = false}: Props): ReactElement | null => {
	const renderedString = katex.renderToString(children, {
		output: `html`,
		displayMode,
	})

	return <span dangerouslySetInnerHTML={{__html: renderedString}} />
}

export default Katex
