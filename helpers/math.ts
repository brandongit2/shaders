export const smoothStep = (edge1: number, edge2: number, x: number): number => {
	const t = Math.max(0, Math.min(1, (x - edge1) / (edge2 - edge1)))
	return t * t * (3 - 2 * t)
}
