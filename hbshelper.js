module.exports = {
	test: function(state) {
		if (state === 1) {
			return '1'
		}
		if (state === 2) {
			return '2'
		}
		if (state === 3) {
			return '3'
		}
	},
	equalone: function(v1, options) {
		if (v1 === '1') {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	}
}