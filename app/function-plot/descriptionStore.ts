import create from "zustand"
import {immer} from "zustand/middleware/immer"

type DescriptionStore = {
	sectionInfo: Record<string, {top: number; bottom: number}>
	setSectionInfo: (name: string, info: {top: number; bottom: number}) => void
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
				state.sectionInfo[name] = info
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
