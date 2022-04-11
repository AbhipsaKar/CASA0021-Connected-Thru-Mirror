/* Magic Mirror
 * Module: MMM-RecordPortal
 * Modified by: Abhipsa Kar
 * Date: 10-03-2022
 */

var chunks = [];

Module.register("MMM-RecordPortal", {
	// Default module config.
	defaults: {
		height: 100,
		width : 320,
		mqttServer: 'mqtt.cetools.org',
		mode: 'receive',
    	loadingText: 'Loading MQTT Data...',
    	topic: 'student/CASA0014/plant/ucfnaka/CAMERAFEED/',
		interval: 300000,
		},
	symbol: 0,
	streaming : 0,
	mediaRecorder : null,
    m_blob: null,
	record_state : false,
	show_state : false,

	getDom: function() {
		console.log("getDom called");
		const wrapper = document.createElement("div");

		var title = document.createElement("h3");
		title.textContent = "Press GREEN button to record";
		wrapper.appendChild(title);
		var frame = document.createElement("div");
		frame.className = "contain";

		if(this.record_state == false)
		{
		//	frame.hidden = true;
		}
		else
		{
		//	frame.hidden = false;
		}
		wrapper.appendChild(frame);
		return wrapper;
	},
	//Define required styles.
	getStyles: function () {
		return ["MMM-RecordPortal.css"];
	},

	// Define required translations.
	getTranslations: function () {
		// The translations for the default modules are defined in the core translation files.
		// Therefor we can just return false. Otherwise we should have returned a dictionary.
		// If you're trying to build your own module including translations, check out the documentation.
		return false;
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		/*navigator.mediaDevices.enumerateDevices()
		.then(function(devices) {
  		devices.forEach(function(device) {
    			console.log(device.kind + ": " + device.label +
            		    " id = " + device.deviceId);
 			 });
		})
		.catch(function(err) {
  			console.log(err.name + ": " + err.message);
		});  */

		//this.updateMqtt(this);          	
		
 
	},

	stopFuncton: function(){
		
		var blob =null;
		async function stopvideo(self){
			let myPromise;

			console.log("recording state", self.record_state);
			
			window.MediaRecorder.onstop = function(e) {
				myPromise = new Promise(function(resolve) {
				if(chunks == null)
				{
					console.log("No data found!!" );
				}
				
				blob = new Blob(
					chunks, { 'type' : 'video/webm; codecs=vp8' });
				
				resolve(blob);
				});
				//console.log("Record stopped");
				self.record_state = false;
				console.log("Record stopped",blob);
				chunks =[]; //Reset chunks array
			};

			window.MediaRecorder.stop();
			window.MediaRecorder.onstop();
			

			self.m_blob = await myPromise;
			console.log("recorder stopped", self.m_blob );
			console.log("recording state", self.record_state);
			if(self.m_blob != null)
			{
				console.log("promise resolved");
				self.sendSocketNotification("SAVE_FILE", self.m_blob);
	
				var topic = self.config.topic + self.symbol;
				self.sendSocketNotification("MQTT_SEND", {
					mqttServer: self.config.mqttServer,
					topic: topic,
					payload: self.m_blob
				  }); 
			}
				
		}

		stopvideo(this);   
	},

	suspend: function() {
		console.log("Suspend function called", this.record_state);
		if(this.record_state != false)
		{
			this.stopFuncton();
			document.querySelector("h3").textContent = "Press GREEN button to record";
		}
		this.show_state = false;
		//stop video
		//this.hide();
	},
	resume: function() {
		//start video
		//this.show();
		/*
		console.log("Resume function called", this.record_state);
		if(this.record_state == false)
		{
			window.MediaRecorder.start(1000);
			this.record_state = true;
			document.querySelector("h3").textContent = "RECORDING";
		}*/	
		this.show_state = true;
		this.updateMqtt(this); 
		console.log("Resume function called");
		navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,                
		})
		.then(function(stream) {

			if (!this.streaming) {
				console.log("Ready to play");
				var options = {
					audioBitsPerSecond : 128000,
					videoBitsPerSecond : 128000,
					mimeType : 'video/webm'
		   		}
				this.mediaRecorder = new MediaRecorder(stream,options);
				//Make the mediaRecorder global
				window.MediaRecorder = this.mediaRecorder;
	  
				// Whenever (here when the recorder
				// stops recording) data is available
				// the MediaRecorder emits a "dataavailable" 
				// event with the recorded media data.
				this.streaming = true;
				window.MediaRecorder.onstart = (e) => {
					console.log("Record started");
					this.record_state = true;
				}

				window.MediaRecorder.ondataavailable = (e) => {
			
					if(e.data == null)
					{
						console.log("No data to push!!" );
	
					}
					// Push the recorded media data to
					// the chunks array
					chunks.push(e.data);
					console.log("data push",chunks);
				};
			}
		})
		.catch(function(err) {
			console.log("An error occurred: " + err);
		});

	},

	sendNotification: function(blob)
	{
		this.sendSocketNotification(cmd, blob);
	},

  	updateMqtt: function(self) {
    	self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer, topic: self.config.topic, mode: self.config.mode ,symbol:self.symbol});
    	setTimeout(self.updateMqtt, self.config.interval, self);
  	},
       	

	

  	socketNotificationReceived: function(notification, payload) {
    	/*if (notification === 'MQTT_DATA' && payload.topic === this.config.topic) {
      	this.mqttVal = payload.data.toString();
      	this.loaded = true;
      	console.log("Data from mqtt"+ this.mqttVal );
      	this.photo.setAttribute('src', this.mqttVal);
     	 this.updateDom(3000);
	  	

    	}

    	if (notification === 'ERROR') {
      		this.sendNotification('SHOW_ALERT', payload);
    	}*/
  },

  notificationReceived: function(notification, payload, sender) {
    var self = this;
    
    if(notification === 'START_TIMER' && this.show_state == true) 
    {
	console.log("Record button press", this.record_state);
		if(this.record_state == false)
		{
			console.log("Start recording");
			window.MediaRecorder.start(1000);
			this.record_state = true;
			document.querySelector("h3").textContent = "RECORDING";
		}
		else{
			console.log("Stop recording");
			
			this.stopFuncton();
			document.querySelector("h3").textContent = "Press GREEN button to record";
		}	    
    }
    if (notification === "Profile"){
	console.log("profile chg", payload);
	  if(payload === "Cade"){
		 this.symbol = 0; 
	  }
	  else if(payload === "Abi"){
		 this.symbol = 1; 
	  }
	  else if(payload === "Wing"){
		 this.symbol = 2; 
	  }
	  else if(payload === "Abhipsa"){
		 this.symbol = 3; 
	  }
	  console.log("symbol", this.symbol);
    }
    
/*
    var topic;
    if (sender) {
      Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name + ": ", payload);
      topic = this.config.topic + "/" + sender.name + "/" + notification;
    } else {
      Log.log(this.name + " received a system notification: " + notification + ": ", payload);
      topic = this.config.topic + "/" + notification;
    }*/

  },

});
