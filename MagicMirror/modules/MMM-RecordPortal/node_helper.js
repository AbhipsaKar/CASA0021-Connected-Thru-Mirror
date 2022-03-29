/* Magic Mirror
 * Node Helper: Newsfeed
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 * Renamed to MMM-RecordPortal
 * Modified by: Abhipsa Kar
 * Date: 10-03-2022
 */

const NodeHelper = require("node_helper");
const Log = require("logger");
const fs = require("fs");
var mqtt = require('mqtt');

module.exports = NodeHelper.create({
	// Override start method.
	start: function () {
		Log.log("Starting node helper for: " + this.name);
    		this.clients = [];

	},

	// Override socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "ADD_FEED") {
			
		}
		if (notification === "SAVE_FILE") {
			console.log("Notification received:Abby ");

  			fs.writeFile("test_vid.txt", payload, "binary", (error, payload) => {
  				console.log("Write complete");
  				//console.log(payload);
			});
			
			}
		if (notification === 'MQTT_SERVER') {
      		this.connectMqtt(payload);
    		} 
		else if(notification == 'MQTT_SEND') {
			console.log("Publish payload ");
     		var client = this.clients[payload.mqttServer];
      		if(typeof client !== "undefined") {
				fs.readFile("test_vid.txt", (err, data) => {
					if (err) {
					  console.error(data);
					  return;
					}
					
					client.publish(payload.topic, data,{ qos: 0, retain: false }, (error) => {
						if (error) {
						  console.log(error);
						}  
					})
					console.log("Publish payload complete",payload.topic);
				})
      		}
    	}
		

	},

connectMqtt: function(config) {
    var self = this;
    var client;

    if(typeof self.clients[config.mqttServer] === "undefined") {
      console.log("Creating new MQTT client for url: ", config.mqttServer);

const options = {
  host: config.mqttServer,
  port: 1884,
  username: 'student',
  password : 'ce2021-mqtt-forget-whale',

}
      client = mqtt.connect( options);
      self.clients[config.mqttServer] = client;

      client.on('error', function(error) {
        console.log('*** MQTT JS ERROR ***: ' + error);
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Error',
          message: 'The MQTT Client has suffered an error: ' + error
        });
      });

      client.on('offline', function() {
        console.error('*** MQTT Client Offline ***');
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Offline',
          message: 'MQTT Server is offline.'
        });
      });

      client.on('connect', function(connack) {
        console.log('MQTT Client connected to ' + config.mqttServer);

        if(config.mode !== 'send') {
          console.log('MQTT Client subscribing to ' + config.topic);

          client.on('message', function(topic, message) {
			console.log("Message received");  

			var filename = "./modules/MMM-PlayPortal/hello_" + config.profile + ".webm";
			fs.writeFile(filename, message, "binary", (error, message) => {
				console.log("Write complete for video");
				console.log(error);
		  	});

			fs.readFile(filename, (err, data) => {
				if (err) {
				  console.error(data);
				  return;
				}

			});

          });
		  var topic = config.topic + "#";
          client.subscribe(topic);
	  	  client.publish(config.topic, 2.5,{ qos: 0, retain: false }, (error) => {
    		if (error) {
     		 console.log(error);
    		}  })

        }
      });

      client.on('reconnect', function(err) {
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Reconnect',
          message: 'MQTT reconnect.'
        });
        console.log(self.name + " reconnect:", err);
      });
    } else {
      client = self.clients[config.mqttServer];
    }
  },



});
