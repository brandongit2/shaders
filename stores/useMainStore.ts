import create from "zustand"

import type {MainStore} from "../components/ShaderLayout/types"

const useMainStore = create<MainStore>((set) => ({
	appMode: `fullscreen`,
	delayedAppMode: `fullscreen`,
	setDelayedAppMode: (mode) => void set(() => ({delayedAppMode: mode})),
	screenWidth: 0,
	setScreenWidth: (width) => void set(() => ({screenWidth: width})),

	shader: null,
	setShader: (shader) => void set(() => ({shader})),

	toggleDescription: () =>
		void set((state) => ({appMode: state.appMode === `description` ? `fullscreen` : `description`})),

	toggleSwitcher: () => void set((state) => ({appMode: state.appMode === `switcher` ? `fullscreen` : `switcher`})),
}))

export default useMainStore
