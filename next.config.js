const config = {
	trailingSlash: true,
	redirects: async () => [
		{
			source: `/`,
			destination: `/function-plot/`,
			permanent: false,
		},
	],
	experimental: {
		appDir: true,
		fontLoaders: [
			{
				loader: `@next/font/google`,
				// eslint-disable-next-line quotes
				options: {subsets: ["latin"]},
			},
		],
	},
}

export default config
