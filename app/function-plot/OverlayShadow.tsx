import {motion} from "framer-motion"

import type {ReactElement} from "react"

const OverlayShadow = (): ReactElement | null => {
	return (
		<motion.div
			layout
			transition={{duration: 1, ease: [0.65, 0, 0.35, 1]}}
			className="absolute bottom-0 left-0 h-36 w-full"
			style={{
				backgroundImage: `
          linear-gradient(
            0deg,
            rgb(0% 0% 0% / 0.78) 0%,
            rgb(0% 0% 0% / 0.75031) 12.5%,
            rgb(0% 0% 0% / 0.66577) 25%,
            rgb(0% 0% 0% / 0.53924) 37.5%,
            rgb(0% 0% 0% / 0.39) 50%,
            rgb(0% 0% 0% / 0.24075) 62.5%,
            rgb(0% 0% 0% / 0.11422) 75%,
            rgb(0% 0% 0% / 0.02968) 87.5%,
            rgb(0% 0% 0% / 0) 100%
          )
        `,
			}}
		/>
	)
}

export default OverlayShadow
