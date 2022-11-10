import clsx from "clsx"

import type {ReactElement} from "react"

import useDescriptionStore from "./descriptionStore"

type Props = {
	scrollProgress: number
}

const ScrollProgress = ({scrollProgress}: Props): ReactElement | null => {
	const {sectionInfo} = useDescriptionStore()

	return (
		<div className="relative h-full max-h-72 w-0">
			<div className="absolute h-full w-px bg-white/20" />

			{sectionInfo.map((section, i) => (
				<div
					key={i}
					className={clsx(
						`absolute -left-1 h-2 w-2 rounded-full bg-white/60 transition-[transform,background-color]`,
						scrollProgress >= section.top && scrollProgress <= section.bottom && `scale-150 bg-yellow-500`
					)}
					style={{top: `${((section.top + section.bottom) / 2) * 100}%`}}
				/>
			))}
		</div>
	)
}

export default ScrollProgress
