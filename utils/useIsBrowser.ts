import {useEffect, useState} from "react"

export const useIsBrowser = (): boolean => {
	const [isBrowser, setIsBrowser] = useState(false)
	useEffect(() => void setIsBrowser(true), [])
	return isBrowser
}
