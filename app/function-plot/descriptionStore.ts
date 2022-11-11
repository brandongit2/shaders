import create from "zustand"
import {immer} from "zustand/middleware/immer"

type SectionInfo = {
	isActive: boolean
	top: number
	bottom: number
}

type DescriptionStore = {
	sectionInfo: Record<string, SectionInfo>
	setSectionInfo: (name: string, info: Partial<SectionInfo>) => void
	descriptionPadding: [number, number]
	setDescriptionPaddingTop: (padding: number) => void
	setDescriptionPaddingBottom: (padding: number) => void
	scrollProgress: number
	setScrollProgress: (scrollProgress: number) => void
}

const useDescriptionStore = create(
	immer<DescriptionStore>((set) => ({
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
	}))
)

export default useDescriptionStore
