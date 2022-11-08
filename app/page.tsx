import type {ReactElement} from "react"

import ThreeContainer from "./ThreeContainer"

const Home = (): ReactElement | null => {
	return (
		<div className="flex h-full items-end justify-start">
			<div className="absolute inset-0">
				<ThreeContainer />
			</div>

			<div className="relative z-10 m-8 rounded-md border border-white/10 bg-black/30 p-4 text-white backdrop-blur-md">
				<p className="text-lg">hello</p>
			</div>
		</div>
	)
}

export default Home
