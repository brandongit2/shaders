import Image from "next/image"

import type {ReactNode} from "react"

// import day1Img from "~/app/function-plot/screenshot.png"
import day1Img from "./img.jpg"

type Shader = {
	image: ReactNode
	day: number
	date: string
}

const shaderList: Shader[] = [
	{
		image: <Image src={day1Img} alt="" />,
		day: 1,
		date: `10 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 2,
		date: `11 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 3,
		date: `12 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 4,
		date: `13 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 5,
		date: `14 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 6,
		date: `12 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 7,
		date: `13 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 8,
		date: `14 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 9,
		date: `12 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 10,
		date: `13 Nov 2022`,
	},
	{
		image: <Image src={day1Img} alt="" />,
		day: 11,
		date: `14 Nov 2022`,
	},
]

export default shaderList
