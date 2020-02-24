# MMM-homeassistant-sensors

This a module for the [MagicMirror](https://github.com/MichMich/MagicMirror/tree/develop).
It can display information from [Home Assistant](https://home-assistant.io/) using the home assistant REST API.

## Installation

Navigate into your MagicMirror's `modules` folder and clone this repository:
`cd ~/MagicMirror/modules && git clone https://github.com/leinich/MMM-homeassistant-sensors.git`

If you want to use icons for the sensors download the `MaterialDesignIcons` webfont from https://github.com/Templarian/MaterialDesign-Webfont/archive/master.zip and unzip the folder:
`cd ~/MagicMirror/modules/MMM-homeassistant-sensors && wget https://github.com/Templarian/MaterialDesign-Webfont/archive/master.zip && unzip master.zip`

## Configuration

It is very simple to set up this module, a sample configuration looks like this:

## Configuration Options

| Option           | Description                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `prettyName`     | Pretty print the name of each JSON key (remove camelCase and underscores). <br><br> **Default:** `true`       |
| `stripName`      | Removes all keys before the printed key. <br><br>**Example:** `a.b.c` will print `c`.<br> **Default:** `true` |
| `title`          | Title to display at the top of the module. <br><br> **Default:** `Home Assistant`                             |
| `host`           | The hostname or ip adress of the home assistant instance. <br><br> **Default:** `REQUIRED hassio.local`       |
| `port`           | port of homeassistant e.g. 443 for SSL. <br><br> **Default:** `8321`                                          |
| `https`          | is SSL enabled on home assistant (true/false) <br><br> **Default:** `REQUIRED false`                          |
| `token`          | The long lived token. <br><br> **Default:** `REQUIRED`                                                        |
| `apipassword`    | Deprecated API password. <br><br> **Default:** ``                                                             |
| `updateInterval` | The time between updates (In milliseconds). <br><br> **Default:** `300000 (5 minutes)`                        |
| `selfsigned`     | allows self signed certificates/ less secure (true/false). <br><br> **Default:** `false`                      |
| `debuglogging`   | Enable logging into /home/pi/.pm2/logs/mm-error.log (true/false). <br><br> **Default:** `false`               |
| `values`         | Specify specific values from the json feed to only show what you need (entity_id).                            |

## values option

| Option           | Description                                                                                                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sensor`         | `entity_id` from Home Assistant. Please have a look at the states pages for the unique `entity_id` of your sensor                                                                                           |
| `alertThreshold` | As soon as the measured value of the sensor exceeds the configured threshold, the entry will begin to 'blink'. <br><br> **Default:** `off`                                                                  |
| `attributes`     | Array of sensor attributes to show. If not set, only show sensor state. If set, you can add as many attributes as you want, if you want to show the state as well add `'state'`. <br><br> **Default:** `[]` |
| `icons`          | Icons object for the on/off status of sensor. see: [MaterialDesignIcons](https://materialdesignicons.com/)                                                                                                  |

## icons option

| Option         | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `default`      | Default icon of the sensor. In case there is no on/off status, like processor use. |
| `state_on`     | On status icon of the sensor                                                       |
| `state_off`    | Off status icon of the sensor                                                      |
| `state_open`   | Open status icon of the sensor                                                     |
| `state_closed` | Closed status icon of the sensor                                                   |

Here is an example of an entry in `config.js`

```
modules: [{
		module: 'MMM-homeassistant-sensors',
		position: 'top_left',
		config: {
			host: "YOUR_HASS_HOST",
			port: "8123",
			https: false,
			token: "YOUR_LONG_LIVED_HASS_TOKEN",
			prettyName: false,
			stripName: false,
			debuglogging: false,
			values: [{
					sensor: "sensor.processor_use",
					alertThreshold: 50,
					icons: [{
							"default": "chip"
						}
					]
				}, {
					sensor: "binary_sensor.sensor",
					icons: [{
							"state_off": "run",
							"state_on": "run-fast"
						}
					]
				}, {
					sensor: "switch.reception_spot",
					icons: [{
							"state_off": "lightbulb-outline",
							"state_on": "lightbulb-on-outline"
						}
					]
				}
			]

		}
	}
]
```

**Result** example:

![Alt text](https://image.ibb.co/b8edjx/dynamic_icons.png "dynamic icons example")

## Special Thanks

- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
- [tkoeberl](https://github.com/tkoeberl) for creating the initial module that I used as guidance in creating this module.
