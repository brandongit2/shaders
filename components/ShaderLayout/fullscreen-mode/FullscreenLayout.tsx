import type {FC, ReactNode} from "react"

type Props = {
	children: ReactNode
}

const FullscreenLayout: FC<Props> = ({children}) => {
	return <div className="h-full w-full">{children}</div>
}

export default FullscreenLayout
