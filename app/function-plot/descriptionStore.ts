import create from "zustand"

type DescriptionStore = {
	sectionInfo: {top: number; bottom: number}[]
	setSectionInfo: (sectionInfo: {top: number; bottom: number}[]) => void
	descriptionPadding: number
	setDescriptionPadding: (descriptionPadding: number) => void
}

const useDescriptionStore = create<DescriptionStore>((set) => ({
	sectionInfo: [],
	setSectionInfo: (sectionInfo) => set({sectionInfo}),
	descriptionPadding: 0,
	setDescriptionPadding: (descriptionPadding) => set({descriptionPadding}),
}))

export default useDescriptionStore
