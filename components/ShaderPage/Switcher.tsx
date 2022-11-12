import type {ReactElement, ReactNode} from "react"

type Props = {
	children: ReactNode
}

const Switcher = ({children}: Props): ReactElement | null => {
	return <div>{children}</div>
}

export default Switcher
