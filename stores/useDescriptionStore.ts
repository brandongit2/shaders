import produce from "immer"
import create from "zustand"

import type {DescriptionStore} from "~/types"

const useDescriptionStore = create<DescriptionStore>((set) => ({
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
}))

export default useDescriptionStore
