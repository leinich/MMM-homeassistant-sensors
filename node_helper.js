var NodeHelper = require('node_helper');
var got = require('got');

module.exports = NodeHelper.create({
  start: function () {
    if(config.debuglogging) { console.log('MMM-homeassistant-sensors helper started...') };
  },
  getStats: function (config) {
	var self = this;
	var url = self.buildUrl(config);
	var instance = got.extend({
	  hooks: {
		  beforeRequest: [
			  options => {
				  if (!options.context || !options.context.token) {
					throw new Error('Long Lived Token required');
				  }
				  json: true;
				  options.headers = {'Authorization' : 'Bearer ' + options.context.token}
			  }
		  ]
	  }
	});
	(async () => {
		var context = {
			token: config.token
		};

		try {
			var response = await instance(url, {context});
			if (response.statusCode == 200) {
				if(config.debuglogging) { console.log('MMM-homeassistant-sensors response successfull. calling STATS_RESULT') };
				self.sendSocketNotification('STATS_RESULT', JSON.parse(response.body));
			}
			if(config.debuglogging) {
				console.log('MMM-homeassistant-sensors Body:', response.body);
				console.log('MMM-homeassistant-sensors statusCode:', response.statusCode);
			}
		} catch (error) {
			console.log('MMM-homeassistant-sensors - Connection Failed: ' + error.response.body);
		}
	})();

  },
  buildUrl: function(config) {
    var url = config.host;
    if (config.port) {
      url = url + ':' + config.port;
    }
    url = url + '/api/states'
    if (config.https) {
      url = 'https://' + url;
    } else {
      url = 'http://' + url;
    }
    if(config.debuglogging) { console.error("MMM-homeassistant-sensors - buildUrl:", url);}
    return url;
  },
  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_STATS') {
      this.getStats(payload);
    }
  }
});
