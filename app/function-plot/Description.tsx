import {Joan} from "@next/font/google"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import clsx from "clsx"
import Link from "next/link"
import {useCallback, useEffect} from "react"
import shallow from "zustand/shallow"

import type {ReactElement} from "react"

import DescriptionSection from "./DescriptionSection"
import useDescriptionStore from "./descriptionStore"
import Katex from "~/components/Katex"

// eslint-disable-next-line @typescript-eslint/quotes
const joan = Joan({weight: "400"})

const Description = (): ReactElement | null => {
	const {
		descriptionPadding: [descriptionPaddingTop, descriptionPaddingBottom],
		setDescriptionPaddingTop,
		setDescriptionPaddingBottom,
		setScrollProgress,
	} = useDescriptionStore(
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
				<DescriptionSection name="intro">
					<p className={joan.className}>
						This is a plot of the function <Katex>{`x^2 + \\frac{1}{5}\\sin(5x + t)`}</Katex> on the domain{` `}
						<Katex>{`x \\in [0, 1]`}</Katex> and range{` `}
						<span className="">
							<Katex>y \in [0.1, 1.1].</Katex>
						</span>
					</p>
					<br />
					<p>To make it was more complicated than it seems. Let&apos;s explore how I did it.</p>
				</DescriptionSection>
				<DescriptionSection name="paragraph-1">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut neque nisl. Sed ac quam lorem. Ut nisi
						nibh, tincidunt ac enim in, suscipit vestibulum purus. Integer rhoncus elit non ornare commodo. Integer
						suscipit ex sit amet vulputate consequat. Proin scelerisque quis lectus sed sodales. Phasellus quis arcu id
						magna molestie vehicula. Sed euismod ligula eget ipsum imperdiet, nec consequat purus feugiat. Sed rhoncus
						nibh et lectus interdum, quis viverra nunc fermentum. Ut at turpis eget libero gravida congue et sit amet
						magna. Mauris tincidunt metus metus, eu blandit libero semper nec. Nulla facilisi. Suspendisse id augue nec
						ligula tincidunt mollis tempor tempor nibh. Nulla eget nisi quis purus scelerisque tincidunt.
					</p>
				</DescriptionSection>
				<DescriptionSection name="paragraph-2">
					<p>
						Proin ligula urna, eleifend non tincidunt id, hendrerit eu felis. Ut vestibulum quis elit sed condimentum.
						Duis justo eros, elementum eget mollis nec, interdum id elit. Suspendisse libero leo, placerat quis nunc et,
						interdum fringilla elit. Mauris pretium mollis ligula at pellentesque. Vivamus leo odio, cursus at quam in,
						lobortis viverra erat. Curabitur pulvinar ante vitae est cursus volutpat. Cras in dignissim massa. Sed ac
						odio vitae lorem accumsan ultricies eu non ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
				</DescriptionSection>
				<DescriptionSection name="paragraph-3">
					<p>
						Pellentesque ut orci at quam egestas dignissim. Vivamus ut erat placerat, dignissim orci sed, tempor lacus.
						Morbi pellentesque dui velit, eu blandit metus hendrerit in. Interdum et malesuada fames ac ante ipsum
						primis in faucibus. Sed porttitor imperdiet imperdiet. Nunc vitae metus magna. Cras volutpat ex neque, a
						elementum dui vehicula sit amet. In ultrices enim augue, non consectetur libero vehicula at. Donec eget
						faucibus lectus. Donec sollicitudin, ipsum in pharetra dapibus, quam nunc pellentesque eros, sed mollis
						velit nulla in purus. Aenean velit urna, molestie in lorem bibendum, tincidunt sollicitudin quam. Nam
						gravida ac eros vel suscipit.
					</p>
				</DescriptionSection>
				<DescriptionSection name="paragraph-4" last>
					<p>
						Aenean aliquam quam et neque ullamcorper suscipit. Ut pulvinar, nulla non placerat sagittis, velit nulla
						consequat sem, eu varius leo sem at ipsum. Donec et laoreet nunc. Maecenas quis nunc non sem varius mollis.
						Morbi sed odio eget orci sollicitudin maximus. In a vehicula magna. Pellentesque eros diam, molestie non est
						sagittis, faucibus mattis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
						inceptos himenaeos. Nulla imperdiet libero a erat egestas, quis euismod orci scelerisque. Nunc ut purus eget
						ligula blandit lobortis vitae sed orci. Phasellus faucibus neque id interdum sollicitudin. Fusce feugiat
						tortor et quam pulvinar, sit amet imperdiet ex interdum. Nulla facilisi. Nulla eu ultricies arcu.
					</p>
				</DescriptionSection>
				<div style={{height: `${descriptionPaddingBottom}px`}} />
			</ScrollArea.Viewport>
		</ScrollArea.Root>
	)
}

export default Description
