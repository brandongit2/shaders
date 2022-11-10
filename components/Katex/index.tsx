import katex from "katex"

import type {ReactElement} from "react"

import "./katex.css"

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
