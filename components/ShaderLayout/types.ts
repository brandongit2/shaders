import type {ReactNode} from "react"

export type Shader = {
	name: string
	slug: string
	image: ReactNode
	day: number
	date: string
	fragmentShader: string
	description: ReactNode
}

type SectionInfo = {
	isActive: boolean
	top: number
	bottom: number
}

export type MainStore = {
	appMode: `description` | `switcher` | `fullscreen`
	// For stuff that should happen after animation completes. Only delayed on the animation back to fullscreen, otherwise instant.
	delayedAppMode: `description` | `switcher` | `fullscreen`
	setDelayedAppMode: (mode: `description` | `switcher` | `fullscreen`) => void
	screenWidth: number
	setScreenWidth: (width: number) => void

	shader: Shader | null
	setShader: (shader: Shader) => void

	toggleDescription: () => void
	toggleSwitcher: () => void
}

export type DescriptionStore = {
	sectionInfo: Record<string, SectionInfo>
	setSectionInfo: (name: string, info: Partial<SectionInfo>) => void
	descriptionPadding: [number, number]
	setDescriptionPaddingTop: (padding: number) => void
	setDescriptionPaddingBottom: (padding: number) => void
	scrollProgress: number
	setScrollProgress: (scrollProgress: number) => void
}
