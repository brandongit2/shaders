import clsx from "clsx"
import {useCallback} from "react"
import shallow from "zustand/shallow"

import type {ReactElement, ReactNode} from "react"

import useDescriptionStore from "./descriptionStore"

type Props = {
	children: ReactNode
	name: string
}

const DescriptionSection = ({children, name}: Props): ReactElement | null => {
	const {scrollProgress, sectionInfo, setSectionInfo} = useDescriptionStore(
		(state) => ({
			scrollProgress: state.scrollProgress,
			sectionInfo: state.sectionInfo[name] ?? {top: 0, bottom: 0},
			setSectionInfo: state.setSectionInfo,
		}),
		shallow
	)

	const sectionRef = useCallback(
		(section: HTMLDivElement | null) => {
			if (!section) return
			const scroller = document.querySelector(`[data-scroller]`) as HTMLElement
			setSectionInfo(name, {
				top: section.offsetTop / scroller.scrollHeight,
				bottom: (section.offsetTop + section.offsetHeight) / scroller.scrollHeight,
			})
		},
		[setSectionInfo, name]
	)

	return (
		<div
			data-description-section
			ref={sectionRef}
			className={clsx(
				`border-b border-white/20 py-4 transition-opacity duration-300`,
				(scrollProgress < sectionInfo.top || scrollProgress > sectionInfo.bottom) && `opacity-50`
			)}
		>
			{children}
		</div>
	)
}

export default DescriptionSection
