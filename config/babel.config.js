module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: false
				},
				useBuiltIns: 'usage',
				corejs: 3.31
			}
		]
	]
}
