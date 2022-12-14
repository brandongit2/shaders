"use client"

import clsx from "clsx"

import type {FC} from "react"

import useDescriptionStore from "~/stores/useDescriptionStore"

const ScrollProgress: FC = () => {
	const sectionInfo = useDescriptionStore((state) => state.sectionInfo)

	return (
		<div className="relative h-full max-h-72 w-0">
			<div className="absolute h-full w-px -translate-x-1/2 bg-white/20" />

			{Object.values(sectionInfo).map((section, i) => (
				<div
					key={i}
					className={clsx(
						`absolute h-2 w-2 -translate-x-1/2 rounded-full transition-[transform,background-color]`,
						section.isActive ? `scale-150 bg-yellow-500` : `bg-[#a79db7]`,
					)}
					style={{top: `${((section.top + section.bottom) / 2) * 100}%`}}
				/>
			))}
		</div>
	)
}

export default ScrollProgress
