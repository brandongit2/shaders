import clsx from "clsx"
import {useCallback} from "react"
import {useInView} from "react-intersection-observer"
import {mergeRefs} from "react-merge-refs"

import type {ReactElement, ReactNode} from "react"

import useDescriptionStore from "./descriptionStore"

type Props = {
	children: ReactNode
	name: string
	last?: boolean
}

const DescriptionSection = ({children, name, last}: Props): ReactElement | null => {
	const setSectionInfo = useDescriptionStore((state) => state.setSectionInfo)

	const {ref: interesectionRef, inView} = useInView({
		root: document.querySelector(`[data-scroller]`),
		rootMargin: `-49% 0px -49% 0px`,
	})

	const ref = useCallback(
		(section: HTMLDivElement | null) => {
			if (!section) return

			const scroller = document.querySelector(`[data-scroller]`) as HTMLElement
			setSectionInfo(name, {
				isActive: inView,
				top: section.offsetTop / scroller.scrollHeight,
				bottom: (section.offsetTop + section.offsetHeight) / scroller.scrollHeight,
			})
		},
		[inView, name, setSectionInfo]
	)

	return (
		<div
			data-description-section
			ref={mergeRefs([interesectionRef, ref])}
			className={clsx(
				`py-4 transition-opacity duration-300`,
				!inView && `opacity-50`,
				!last && `border-b border-white/20`
			)}
		>
			{children}
		</div>
	)
}

export default DescriptionSection
