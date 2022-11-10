import create from "zustand"

type DescriptionStore = {
	sectionInfo: {top: number; bottom: number}[]
	setSectionInfo: (sectionInfo: {top: number; bottom: number}[]) => void
	descriptionPadding: number
	setDescriptionPadding: (descriptionPadding: number) => void
	scrollProgress: number
	setScrollProgress: (scrollProgress: number) => void
}

const useDescriptionStore = create<DescriptionStore>((set) => ({
	sectionInfo: [],
	setSectionInfo: (sectionInfo) => set({sectionInfo}),
	descriptionPadding: 0,
	setDescriptionPadding: (descriptionPadding) => set({descriptionPadding}),
	scrollProgress: 0,
	setScrollProgress: (scrollProgress) => set({scrollProgress}),
}))

export default useDescriptionStore
