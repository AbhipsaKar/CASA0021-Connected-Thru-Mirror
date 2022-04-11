/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-UK",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_right",
			classes: 'default everyone',
			
		},

		//Original calendar
		{
			module: 'calendar',
			header: 'My Calendar',
			position: 'top_left',
			classes: 'default default',
			config: {
				calendars: [

					{
						profile: "default",
						symbol: 'calendar-check-o ',
						//url: ''
					},
					{
						profile: "Cade",
						symbol: 'calendar-check-o ',
						url: 'webcal://www.ucl.ac.uk/timetable/ics/TZQA8VBZG45CQQY'
					},
					{
						profile: "Abi",
						symbol: 'calendar-plus-o ',
						url: 'https://calendar.google.com/calendar/ical/dv588tajo3h61dankh3pa1tud0%40group.calendar.google.com/private-b2d02f47799e5c5e91b618e1e360b731/basic.ics'
					},
					{
						profile: "Wing",
						symbol: 'birthday-cake',
						url: 'https://calendar.google.com/calendar/ical/ajokj0cih56l27k8c5pg1gbk60%40group.calendar.google.com/private-8c7252064a61a20361b53ad89f66adad/basic.ics'
					},
					{
						profile: "Abhipsa",
						symbol: 'rocket ',
						url: 'https://calendar.google.com/calendar/ical/ood9jqaitun5k71l3ift9cqono%40group.calendar.google.com/private-47bce4bfa57a2e9e477d1118a575b773/basic.ics'
					},
				]
			}
		},
		
		{
			module: 'MMM-TFL-Arrivals-Modified',
			position: 'top_left',
			classes: 'default everyone',
			config: {
				naptanId: "490000129E", // StopPoint id
				animationSpeed: 1000,
				fade: true,
				fadePoint: 0.25, // Start on 1/4th of the list.
				limit: 5,
				initialLoadDelay: 0,
				color: true,
				debug: true
			}
		},
		{
			module: "weather",
			position: "top_left",
			classes: 'default everyone',
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "London",
				locationID: "2643743", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "a2c004a13dbd263059d0ae2933482bcd"
			}
		},
		{
			module: "weatherforecast",
			position: "top_left",
			classes: 'default everyone',
			config: {
				location: "London",
				locationID: "2643743", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "a2c004a13dbd263059d0ae2933482bcd"
			}
		},
		
		{
			module: "newsfeed",
			position: "bottom_right",
			classes: 'default everyone',
			config: {
				feeds: [
					{
						title: "BBC UK",
						url: "https://feeds.bbci.co.uk/news/uk/rss.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		{
			module: 'MMM-ModifiedTimer',
			position: "bottom_right",
			classes: 'default everyone',
		},
		 {
			module: "MMM-RecordPortal",
			position: "middle_center",
			classes: 'default everyone',
			
			
		},
		{
			module: "MMM-PlayPortal",
			position: "middle_center",
			classes: 'default everyone',
			

		}, 
		{
            module: 'MMM-Carousel2',
            position: 'bottom_bar', // Required only for navigation controls
            classes: 'default everyone',
            config: {
                showPageIndicators: true,
                showPageControls: true,
                mode: 'slides',
                slides: [
                   [ "calendar","clock","weather","weatherforecast","newsfeed", "MMM-TFL-Arrivals-Modified",'MMM-Facial-Recognition'],
				   [ "MMM-ModifiedTimer","calendar", "clock" ,"MMM-TFL-Arrivals-Modified",'MMM-Facial-Recognition'],
				   ["MMM-RecordPortal"],
				   ["MMM-PlayPortal"],
                ],
                transitionInterval: 0,
            }
        },
		{
			module: 'MMM-Buttons',
			classes: 'default everyone',
			config: {
				buttons: [
					{
						pin: 15,
						name: "button",
						longPress: {
							notification: "INTERRUPT_TIMER"
						},
						shortPress: {
							notification: "START_TIMER",
							payload: "10000"
						}
					},
					{
						pin: 10,
						name: "timer control up",
						longPress: undefined,
						shortPress: {
							notification: "INCREASE_TIMER",
							payload: {action: "timerup"}
						}
					},
					{
						pin: 17,
						name: "timer control down",
						longPress: undefined,
						shortPress: {
							notification: "DECREASE_TIMER",
							payload: {action: "timerdown"}
						}
					},
					{
						pin: 16,
						name: "page control left",
						longPress: undefined,
						shortPress: {
							notification: "Joystick_action_left",
							payload: {action: "pageleft"}
						}
					},
					{
						pin: 9,
						name: "page control right",
						longPress: undefined,
						shortPress: {
							notification: "Joystick_action_right",
							payload: {action: "pageright"}
						}
					},
					
					{
						pin: 23,
						name: "profile1",
						longPress: undefined,
						shortPress: {
							notification: "Profile",
							payload: "profile1"
						}
					},
					{
						pin: 24,
						name: "profile2",
						longPress: undefined,
						shortPress: {
							notification: "Profile",
							payload: "profile2"
						}
					},
					{
						pin: 13,
						name: "profile3",
						longPress: undefined,
						shortPress: {
							notification: "Profile",
							payload: "profile3"
						}
					},
					{
						pin: 20,
						name: "profile4",
						longPress: undefined,
						shortPress: {
							notification: "Profile",
							payload: "profile4"
						}
					},																				
				]
			}
		},

		{
			module: 'MMM-ProfileSwitcher',
			config: {
				// See 'Configuration options' for more information.
				ignoreModules: ["alert", "updatenotification", "MMM-ProfileSwitcher", "MMM-Facial-Recognition",],
				enterMessages: {
					"Cade" : "Hi,Cade! You look nice today!",
					"Abi" : "Hi,Abi! You look nice today!",
					"Wing" : "Hi,Wing! You look nice today!",
					"Abhipsa" : "Hi,Abhipsa! You look nice today!",
					},
			}
		},
		{
    	module: 'MMM-Facial-Recognition',
    	config: {
    		// 1=LBPH | 2=Fisher | 3=Eigen
    		recognitionAlgorithm: 1,
    		// Threshold for the confidence of a recognized face before it's considered a
    		// positive match.  Confidence values below this threshold will be considered
    		// a positive match because the lower the confidence value, or distance, the
    		// more confident the algorithm is that the face was correctly detected.
    		lbphThreshold: 50,
    		fisherThreshold: 250,
    		eigenThreshold: 3000,
    		// force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
    		useUSBCam: true,
    		// Path to your training xml
    		trainingFile: 'modules/MMM-Facial-Recognition/training.xml',
    		// recognition intervall in seconds (smaller number = faster but CPU intens!)
    		interval: 2,
    		// Logout delay after last recognition so that a user does not get instantly logged out if he turns away from the mirror for a few seconds
    		logoutDelay: 15,
    		// Array with usernames (copy and paste from training script)
    		users:['Abi', 'Wing', 'Abhipsa', 'Cade'],
    		//Module set used for strangers and if no user is detected
    		defaultClass: "default",
       		//Set of modules which should be shown for every user
    		everyoneClass: "everyone",
    		// Boolean to toggle welcomeMessage
    		welcomeMessage: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
