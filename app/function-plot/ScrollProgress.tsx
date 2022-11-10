import clsx from "clsx"
import {useEffect, useState} from "react"

import type {ReactElement} from "react"

type Props = {
	scrollProgress: number
}

const ScrollProgress = ({scrollProgress}: Props): ReactElement | null => {
	const [sectionInfo, setSectionInfo] = useState<{top: number; bottom: number}[]>([])
	useEffect(() => {
		const scroller = document.querySelector(`[data-scroller]`) as HTMLElement
		const sections = Array.from(document.querySelectorAll(`[data-description-section]`))
		setSectionInfo(
			sections.map((section: HTMLElement) => ({
				top: section.offsetTop / scroller.scrollHeight,
				bottom: (section.offsetTop + section.offsetHeight) / scroller.scrollHeight,
			}))
		)
	}, [])

	return (
		<div className="relative">
			{sectionInfo.map((section, i) => (
				<div
					key={i}
					className={clsx(
						`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/60 transition-[transform,background-color]`,
						scrollProgress >= section.top && scrollProgress <= section.bottom && `scale-150 bg-yellow-500`
					)}
					style={{top: `${((section.top + section.bottom) / 2) * 100}%`}}
				/>
			))}
		</div>
	)
}

export default ScrollProgress
