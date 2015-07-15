'use strict';

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000,
	ipaddress = process.env.OPENSHIFT_NODEJS_IP;

var Woden = require('woden'),
	woden = new Woden({});

woden.when(/api.rovicorp.com/, {
	cacheTimeout: function(cacheEntry, req, proxyRes) {
		if (proxyRes.statusCode === 404) {
			return -1;
		}
		return 43200000;
	},
	params: {
		apiKey : process.env.ROVI_API_KEY
	}
});

woden.listen(port, ipaddress);