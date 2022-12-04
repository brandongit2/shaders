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

type AppMode = `description` | `switcher` | `fullscreen`

export type MainStore = {
	appMode: AppMode
	beginTransition: (to: AppMode) => void
	prevAppMode: AppMode
	isTransitioning: boolean

	screenWidth: number
	setScreenWidth: (width: number) => void

	shader: Shader | null
	setShader: (shader: Shader) => void
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
