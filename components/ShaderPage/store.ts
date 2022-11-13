import create from "zustand"
import {immer} from "zustand/middleware/immer"

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

const useStore = create(
	immer<DescriptionStore>((set) => ({
		appMode: `fullscreen`,
		delayedAppMode: `fullscreen`,
		setDelayedAppMode: (mode) =>
			set((state) => {
				state.delayedAppMode = mode
			}),

		// Description stuff
		toggleDescription: () =>
			set((state) => {
				state.appMode = state.appMode === `description` ? `fullscreen` : `description`
			}),
		sectionInfo: {},
		setSectionInfo: (name, info) =>
			set((state) => {
				state.sectionInfo[name] = {
					...(state.sectionInfo[name] ?? {isActive: false, top: 0, bottom: 0}),
					...info,
				}
			}),
		descriptionPadding: [0, 0],
		setDescriptionPaddingTop: (padding) =>
			set((state) => {
				state.descriptionPadding[0] = padding
			}),
		setDescriptionPaddingBottom: (padding) =>
			set((state) => {
				state.descriptionPadding[1] = padding
			}),
		scrollProgress: 0,
		setScrollProgress: (scrollProgress) => set({scrollProgress}),

		// Switcher stuff
		isSwitcherOpen: false,
		toggleSwitcher: () =>
			set((state) => {
				state.appMode = state.appMode === `switcher` ? `fullscreen` : `switcher`
			}),
	})),
)

export default useStore
