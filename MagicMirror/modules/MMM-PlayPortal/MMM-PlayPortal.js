/* Magic Mirror
 * Module: MMM-PlayPortal
 *.
 * 
 * Renamed from: MMM-Videoplayer(https://github.com/Snille/MMM-Videoplayer)
 * Modified by: Abhipsa kar
 * Date: 10-03-2022
 */


Module.register("MMM-PlayPortal", {
	// Default module config.
	defaults: {
		defaultvideo: "/modules/MMM-PlayPortal/hello_0.webm",
		videolist: ["/modules/MMM-PlayPortal/hello_0.webm","/modules/MMM-PlayPortal/hello_1.webm", "/modules/MMM-PlayPortal/hello_2.webm"],
		random: false, // Play the videos randomly. 
		loop: true, // Repeat the video list.
		hideonstart: false, // If set to true, the player will hide it self when a clip is loaded (and just started playing). Then when the player is shown again it will continue play the clip and hide itself again when the next clip is loaded (and just starts playing) and so on.
		fadeSpeed: 1000, // The speed to hide the module (milliseconds).
		showcontrols: false, // Set to true if you want the video controls to show.
		preload: "auto", // Can be set to: "auto", "metadata", "none".
		autoplay: false, // If set to true, sound (muted below) has to be true, otherwise the video will not auto play.
		muted: false, // Mute the sound. If auto play is true, this needs to be true as well, otherwise the video will not auto play.
		pauseonhide: true, // If true the module will pause the video when hidden.
		resumeonshow: true,  // If true the module will resume the video when shown.
		notification: "VIDEOPLAYER1", // Unique notification string for this player.
		
	},

	start: function() {
        this.sendSocketNotification("main", {"test":"test"})
    },
	// Loading the CSS
	getStyles: function () {
		return ["MMM-PlayPortal.css"];
	},

	suspend: function () {
		if (this.config.pauseonhide) {
			this.video.pause();
		}
	},

	// What happens when the module is shown.
	resume: function () {
		if (this.config.resumeonshow) {
			this.video.play();
		}
	},


	nextVideo: function () {

		// If set to true, the player will hide it self when a clip is loaded (and just started playing).
		if (this.config.hideonstart) {
			this.hide(this.config.fadeSpeed)
		}

		this.wrapper.animate([
			{transform: 'translate(0px,200px)'},
			{transform: 'translate(0px,0px)'}
		   ],
		   {duration: 500});
		
		//this.animate({right: '250px'});
		//wrapper.hide(this.config.fadeSpeed);

		// Resets the video queue if set to loop.
		if (this.videoArray.length == 0) {
			console.log(" 0 length in video list");
			if (!this.config.loop) {
				return;
			}
			this.videoArray = this.playedVideoArray;
			this.playedVideoArray = [];
		}

		// Random video.
		if (this.config.random) {
			this.currentVideoIndex = Math.floor(Math.random() * this.videoArray.length);
		}
		/*else
		{
			this.currentVideoIndex = this.currentVideoIndex + 1;
			if (this.currentVideoIndex > this.videoArray.length)
			{
				this.currentVideoIndex = 0;

			}
		}*/

		console.log("Print new index");
		console.log(this.currentVideoIndex);

		
		// Sets the video to play.
		this.video.setAttribute("src", this.videoArray[this.currentVideoIndex]);
		// Add the played video to the played queue.
		this.playedVideoArray.push(this.videoArray.splice(this.currentVideoIndex, 1))
		this.video.load();

		this.video.play();
	
	},

	// Send the module. :)
	getDom: function () {
		// Setup the video array.
		this.videoArray = [];
		this.playedVideoArray = [];

		
		// Checks if anything is defined in the config (video or videolist).
		if (!this.config.video && !this.config.videolist) {
			// If not, adds the default clip.
			this.videoArray = [this.config.defaultvideo];
		} else {
			// If videolist is defined, adds them to the array.
			if (this.config.videolist) {
				this.videoArray = this.config.videolist;
			}
			// If video is defined add that first in the array. 
			if (this.config.video) {
				this.videoArray.unshift(this.config.video);
			}
		}

		// Build the player.
		this.wrapper = document.createElement("div");
		
		this.wrapper.id = "container";
		// Adds the video
		this.video = document.createElement("video");

		// Make sure we set the video list to 0
		this.currentVideoIndex = 0;


		// Adds the rest of the payer video tag settings.
		this.video.muted = this.config.muted;
		this.video.autoplay = this.config.autoplay;
		//this.video.loop = true;
		//this.video.controls = this.config.showcontrols;
		//this.video.preload = this.config.preload;
		this.video.id = this.identifier + "_video";

		this.video.addEventListener("ended", () => {
			console.log("Video ended");
		
			this.nextVideo(this);
		});


		//this.video.play();
		// Loads the first video.
		this.nextVideo();
		// Wrap it up.
		this.wrapper.appendChild(this.video);
		
		//Sends it back to the dom.
		return this.wrapper;
	},

	/*socketNotificationReceived: function(notification, payload) {
		if (notification === "PUSH_ITEMS" ) {
		  //this.videolist = payload;
		  console.log("Elements pushed");
		}
		console.log('socketNotificationReceived() in main module..'+notification);
		if (notification === "test2") {
			console.log('test2 socket notification received...');
		}
	
	},*/

	
});
