const NodeHelper = require("node_helper");
const Log = require("logger");
const fs = require("fs");
const { resolve } = require("path");


module.exports = NodeHelper.create({
	// Override start method.
	start: function () {
		var fileList = [];
		Log.log("Starting node helper for: " + this.name);

		

	},
	socketNotificationReceived: function(notification, payload) {
		var self=this;
		console.log('*Starting socketNotificationReceived()*'+notification);
		if (notification === "main") {
			console.log(notification+' socket notification received...');
			function1();
		}
	},

	function1:function(){
		console.log('inside function1');
		fs.readdir("./modules/MMM-PlayPortal/", function (err, files) {
			//handling error
		if (err) {
				return console.log('Unable to scan directory: ' + err);
		} 

		var promises = [];
		files.forEach(function (file) {
			if (file.includes(".webm"))	{
				const promise = file;
				//console.log(file);
				promises.push(promise);
				resolve(promise);
			}
		});
			// wait until all promises are resolved
			
		Promise.all(promises).then((values) => {
			console.log("Time to push"); 
			console.log(values); 
			//this.sendSocketNotification("PUSH_ITEMS", values);
		});
		});
		//this.sendSocketNotification("test2",{message:"test2"});
	}

});
