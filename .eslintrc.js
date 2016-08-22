module.exports = {
	'extends': 'airbnb',
	'rules': {},
	'parserOptions': {
	    'ecmaFeatures': {
	    	'experimentalObjectRestSpread': true,
	    	'globalReturn': true,
	    	'jsx': true
	    },
	    'ecmaVersion': 6,
	    'sourceType': 'module'
	},
	'env': {
		'browser': true,
	    'node': true,
	    'mocha': true,
	    'es6': true
	},
	'plugins': [
		'react'
	],
}

