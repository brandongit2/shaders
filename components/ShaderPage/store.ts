import produce from "immer"
import create from "zustand"

import type {Shader} from "./types"

type SectionInfo = {
	isActive: boolean
	top: number
	bottom: number
}

type DescriptionStore = {
	appMode: `description` | `switcher` | `fullscreen`
	// For stuff that should happen after animation completes. Only delayed on the animation back to fullscreen, otherwise instant.
	delayedAppMode: `description` | `switcher` | `fullscreen`
	setDelayedAppMode: (mode: `description` | `switcher` | `fullscreen`) => void

	shader: Shader | null
	setShader: (shader: Shader) => void

	// Description stuff
	toggleDescription: () => void
	sectionInfo: Record<string, SectionInfo>
	setSectionInfo: (name: string, info: Partial<SectionInfo>) => void
	descriptionPadding: [number, number]
	setDescriptionPaddingTop: (padding: number) => void
	setDescriptionPaddingBottom: (padding: number) => void
	scrollProgress: number
	setScrollProgress: (scrollProgress: number) => void

	// Switcher stuff
	toggleSwitcher: () => void
}

const useStore = create<DescriptionStore>((set) => ({
	appMode: `fullscreen`,
	delayedAppMode: `fullscreen`,
	setDelayedAppMode: (mode) => void set(() => ({delayedAppMode: mode})),

	shader: null,
	setShader: (shader) => void set(() => ({shader})),

	// Description stuff
	toggleDescription: () =>
		void set((state) => ({appMode: state.appMode === `description` ? `fullscreen` : `description`})),
	sectionInfo: {},
	setSectionInfo: (name, info) =>
		void set((state) => ({
			sectionInfo: {
				...state.sectionInfo,
				[name]: {
					...(state.sectionInfo[name] ?? {isActive: false, top: 0, bottom: 0}),
					...info,
				},
			},
		})),
	descriptionPadding: [0, 0],
	setDescriptionPaddingTop: (padding) =>
		void set(
			produce((state) => {
				state.descriptionPadding[0] = padding
			}),
		),
	setDescriptionPaddingBottom: (padding) =>
		void set(
			produce((state) => {
				state.descriptionPadding[1] = padding
			}),
		),
	scrollProgress: 0,
	setScrollProgress: (scrollProgress) => void set({scrollProgress}),

	// Switcher stuff
	isSwitcherOpen: false,
	toggleSwitcher: () => void set((state) => ({appMode: state.appMode === `switcher` ? `fullscreen` : `switcher`})),
}))

export default useStore
