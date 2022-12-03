if (process.env.NODE_ENV === `development`)
	Reflect.defineProperty(Object.prototype, `d`, {
		get() {
			const value = this.valueOf()
			// eslint-disable-next-line no-console
			console.log(value)
			return value
		},
		set(value) {
			Reflect.defineProperty(this, `d`, {
				value,
				configurable: true,
				writable: true,
				enumerable: true,
			})
		},
		configurable: true,
		enumerable: false,
	})

export {}
