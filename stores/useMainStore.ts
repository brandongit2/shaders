import create from "zustand"

import type {MainStore} from "../types"

import {transition} from "~/components/ShaderLayout/transition"

const useMainStore = create<MainStore>((set) => ({
	appMode: `fullscreen`,
	beginTransition: (to) => {
		set((state) => ({prevAppMode: state.appMode, appMode: to, isTransitioning: true}))
		setTimeout(() => void set({isTransitioning: false}), transition.duration * 1000)
	},
	prevAppMode: `fullscreen`,
	isTransitioning: false,

	screenWidth: 0,
	setScreenWidth: (width) => void set({screenWidth: width}),

	shader: null,
	setShader: (shader) => void set({shader}),
}))

export default useMainStore
