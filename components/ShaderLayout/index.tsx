"use client"

import {useEffect} from "react"

import type {ReactNode, FC} from "react"

import useMainStore from "../../stores/useMainStore"
import DescriptionLayout from "./description-mode/DescriptionLayout"
import FullscreenLayout from "./fullscreen-mode/FullscreenLayout"
import ShaderDisplay from "./ShaderDisplay"
import SwitcherLayout from "./switcher-mode/SwitcherLayout"
import {transition} from "./transition"

type Props = {
	children: ReactNode
}

const ShaderLayout: FC<Props> = ({children}) => {
	const appMode = useMainStore((state) => state.appMode)
	const delayedAppMode = useMainStore((state) => state.delayedAppMode)
	const setDelayedAppMode = useMainStore((state) => state.setDelayedAppMode)

	useEffect(() => {
		if (appMode === delayedAppMode) return

		if (appMode !== `fullscreen`) {
			setDelayedAppMode(appMode)
		} else {
			setTimeout(() => void setDelayedAppMode(appMode), transition.duration * 1000)
		}
	}, [appMode, delayedAppMode, setDelayedAppMode])

	useEffect(() => {
		document.body.style.backgroundColor = appMode === `switcher` ? `#222` : `#22074a`
	}, [appMode])

	return (
		<div className="relative h-full">
			{appMode === `fullscreen` && (
				<div className="absolute inset-0 isolate z-10">
					<FullscreenLayout>
						<ShaderDisplay>{children}</ShaderDisplay>
					</FullscreenLayout>
				</div>
			)}

			{delayedAppMode === `description` && (
				<div className="absolute inset-0 isolate">
					<DescriptionLayout>
						{appMode === `description` && <ShaderDisplay rounded>{children}</ShaderDisplay>}
					</DescriptionLayout>
				</div>
			)}
			{delayedAppMode === `switcher` && (
				<div className="absolute inset-0 isolate">
					<SwitcherLayout>{appMode === `switcher` && <ShaderDisplay rounded>{children}</ShaderDisplay>}</SwitcherLayout>
				</div>
			)}
		</div>
	)
}

export default ShaderLayout
