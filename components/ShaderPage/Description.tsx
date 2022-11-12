"use client"

import {Joan} from "@next/font/google"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"
import Link from "next/link"
import {useCallback, useEffect} from "react"
import shallow from "zustand/shallow"

import type {ReactElement, ReactNode} from "react"

import useStore from "./store"

// eslint-disable-next-line @typescript-eslint/quotes
const joan = Joan({weight: "400"})

type Props = {
	children: ReactNode
}

const Description = ({children}: Props): ReactElement | null => {
	const {
		descriptionPadding: [descriptionPaddingTop, descriptionPaddingBottom],
		setDescriptionPaddingTop,
		setDescriptionPaddingBottom,
		setScrollProgress,
	} = useStore(
		(state) => ({
			descriptionPadding: state.descriptionPadding,
			setDescriptionPaddingTop: state.setDescriptionPaddingTop,
			setDescriptionPaddingBottom: state.setDescriptionPaddingBottom,
			setScrollProgress: state.setScrollProgress,
		}),
		shallow
	)

	const updateDescriptionPadding = useCallback(() => {
		const scroller = document.querySelector(`[data-scroller]`) as HTMLElement
		const sections: HTMLDivElement[] = Array.from(document.querySelectorAll(`[data-description-section]`))
		const firstSection = sections[0]
		const lastSection = sections.at(-1)
		if (!firstSection || !lastSection) return

		setDescriptionPaddingTop(scroller.clientHeight / 2 - firstSection.clientHeight / 2)
		setDescriptionPaddingBottom(scroller.clientHeight / 2 - lastSection.clientHeight / 2)
	}, [setDescriptionPaddingBottom, setDescriptionPaddingTop])

	useEffect(() => {
		updateDescriptionPadding()
		window.addEventListener(`resize`, updateDescriptionPadding)
		return () => window.removeEventListener(`resize`, updateDescriptionPadding)
	}, [updateDescriptionPadding])

	return (
		<ScrollArea.Root className="mr-2 overflow-hidden">
			<ScrollArea.Viewport
				className={clsx(joan.className, `h-full w-full pr-2 opacity-90`)}
				style={{overflow: `scroll`}}
				onScroll={(evt) => {
					const scrollable = evt.target as HTMLDivElement
					setScrollProgress((scrollable.scrollTop + scrollable.clientHeight / 2) / scrollable.scrollHeight)
				}}
				data-scroller
			>
				<div style={{height: `${descriptionPaddingTop}px`}} className="flex items-end justify-end">
					<p className="mb-2 text-sm text-gray-400/40">
						By{` `}
						<Link href="https://www.brandontsang.net/" target="_blank" className="underline">
							Brandon Tsang
						</Link>
						{` `}on 10 Nov 2022.
					</p>
				</div>
				{children}
				<div style={{height: `${descriptionPaddingBottom}px`}} />
			</ScrollArea.Viewport>
		</ScrollArea.Root>
	)
}

export default Description
