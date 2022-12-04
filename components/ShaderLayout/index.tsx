"use client"

import type {ReactNode, FC} from "react"

import useMainStore from "../../stores/useMainStore"
import DescriptionLayout from "./description-mode/DescriptionLayout"
import FullscreenLayout from "./fullscreen-mode/FullscreenLayout"
import ShaderDisplay from "./ShaderDisplay"
import SwitcherLayout from "./switcher-mode/SwitcherLayout"

type Props = {
	children: ReactNode
}

const ShaderLayout: FC<Props> = ({children}) => {
	const appMode = useMainStore((state) => state.appMode)
	const prevAppMode = useMainStore((state) => state.prevAppMode)

	return (
		<div className="relative h-full">
			{appMode === `fullscreen` && (
				<div className="absolute inset-0 isolate z-10">
					<FullscreenLayout>
						<ShaderDisplay>{children}</ShaderDisplay>
					</FullscreenLayout>
				</div>
			)}

			{(appMode === `description` || prevAppMode === `description`) && (
				<div className="absolute inset-0 isolate">
					<DescriptionLayout>
						{appMode === `description` && (
							<ShaderDisplay rounded hideAuthor>
								{children}
							</ShaderDisplay>
						)}
					</DescriptionLayout>
				</div>
			)}
			{(appMode === `switcher` || prevAppMode === `switcher`) && (
				<div className="absolute inset-0 isolate">
					<SwitcherLayout>{appMode === `switcher` && <ShaderDisplay rounded>{children}</ShaderDisplay>}</SwitcherLayout>
				</div>
			)}
		</div>
	)
}

export default ShaderLayout
