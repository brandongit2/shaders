import clsx from "clsx"
import {useCallback, useState} from "react"

import type {ReactElement, ReactNode} from "react"

type Props = {
	children: ReactNode
	scrollProgress: number
}

const DescriptionSection = ({children, scrollProgress}: Props): ReactElement | null => {
	const [sectionInfo, setSectionInfo] = useState<{top: number; bottom: number}>({top: 0, bottom: 0})
	const sectionRef = useCallback((section: HTMLDivElement | null) => {
		if (!section) return
		const scroller = document.querySelector(`[data-scroller]`) as HTMLElement
		setSectionInfo({
			top: section.offsetTop / scroller.scrollHeight,
			bottom: (section.offsetTop + section.offsetHeight) / scroller.scrollHeight,
		})
	}, [])

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
