import {extend, createRoot, events} from "@react-three/fiber"
import * as THREE from "three"
import {WebGLRenderer} from "three"

import App from "~/components/App"

extend(THREE)

const root = createRoot(document.querySelector(`canvas`)!)

root.configure({
	events,
	flat: true,
	linear: true,
	gl: (canvas) => new WebGLRenderer({canvas, context: canvas.getContext(`webgl2`) ?? undefined}),
})

window.addEventListener(`resize`, () => {
	root.configure({size: {width: window.innerWidth, height: window.innerHeight, top: 0, left: 0}})
})

window.dispatchEvent(new Event(`resize`))

root.render(<App />)
