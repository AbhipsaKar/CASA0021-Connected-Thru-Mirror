# CASA0021-Connected-Thru-Mirror
Group project prototype created for CASA0021 module
<br>Product demo: https://www.youtube.com/watch?v=fjhPnnlj3zE


## What the project does
While getting ready to leave the house for the day, the user should be able to look at the mirror on the desk or wall in the hallway and get important information like the time of the next train or our work schedule for the day. The mirror displays the following information:
1. TFL bus timings at the nearest station
2. Weather/ forecast
3. Clock
4. Newsfeed  

The mirror is customised to the nearest station (currently it is set as King's Cross Station) and the calendar credentials while protecting the user's privacy from other guests using face recognition. Additionally, considering that a family would have multiple members, the mirror supports more than one profile. It has a timer that can countdouwn from 1,2,3,4 or 5 minutes and has a portal that allows recording and playing short videos.
The mirror is controlled by joystick and push button physically.

## Why the project is useful
The idea of having a mirror with display function stems from the limited living space in modern cities, as well as too many devices and screens with infrequent uses in terms of number and duration. Apart from design and decoration, the device serves as a tool to inform and assist users. There are smart mirrors available on the market or by DIY. However, they are mostly one-way which only show information to users and leave little room for users’ input. Often users can only read the information on the mirror, whether it be photos, texts, or videos, with little possibility to insert new information to the device. This product was designed with the ability to receive input data such as video,  as well as commands such as to control the information to be displayed, and set a stopwatch with adjustable length. Equipped with not only a screen but also sensors (camera), this device is an enhancement of the conventional smart mirror and enables bi-directional connection of user, device, and different data sources.
Potential users for this device include technophiles as well as potentially anyone at home, office, or hotel, acquiring the device either by themselves or by the property developers/company. In addition, this product has potential to connect relatives living away through short video messages.

<img width="615" alt="Storyboard" src="https://user-images.githubusercontent.com/91799774/165929435-c831cb3d-804e-4284-966b-0b966d566a79.PNG">

## How to get started
### Components
1.	Raspberry Pi (we used Raspberry Pi 4 Model B)
2.	Screen
3.	Two way mirror
4.	Arcade Joystick
5.	Illuminated Push Button Switch (or any push button)
6.	4 10K Resistors
7.	Jumper wires
8.	Breadboard
9.	3D printed enclosure
Depends on what push button is used:
10.	Solid Wires 
11.	Solder station

### Modules
1. MMM-Buttons https://github.com/Jopyth/MMM-Buttons
2. MMM-Carousel2 https://github.com/lpage30/MMM-Carousel2
3. MMM-Facial-Recognition https://github.com/paviro/MMM-Facial-Recognition
4. MMM-ProfileSwitcher https://github.com/tosti007/MMM-ProfileSwitcher
5. MMM-TFL-Arrivals https://github.com/ryck/MMM-TFL-Arrivals
6. MMM-ModifiedTimer
7. MMM-RecordPortal
8. MMM-PlayPortal

### Installation :
You can recreate this mirror on your own Rpi using the following steps:
1.	Install MagicMirror2 on Raspberry Pi(use tutorial: https://howchoo.com/g/ntcymzbimjv/how-to-install-magic-mirror-on-your-raspberry-pi)
2.	Enable VNC, Camera and GPIO in the rpi configuration menu($ sudo raspi-config)
3.	run following command in home folder to install mqtt: 
$ cd MagicMirror 
$ npm install mqtt
4.	Replace the config, css and modules folder in the MagicMirror folder from this repository.
5.	Unzip the node_modules file in MMM-Buttons, MMM-Carousel2, MMM-TFL-Arrivals-Modified
6.	Edit the config.js file in the config folder
    - The naptanID for the MMM-TFL-Arrivals-Modified module can be found in the URLs of the bus stop webpage on TFL
      e.g. King's Cross Station has a naptanID of 490000129E and can be found within https://tfl.gov.uk/bus/stop/490000129E/kings-cross-station
    - The locationID for the weather and weatherforcast modules can be found in http://bulk.openweathermap.org/sample/city.list.json.gz or within the URLs of the openweathermap websites
      e.g. London, GB has a location ID of 2643743 and can be found within https://openweathermap.org/city/2643743
    - The apiKey and appid for the weather and weatherforcast modules are the API KEY from your openweathermap account
    - Add your desired calendar url for calendar module
7.  Add the MQTT url, username and password in ~/MagicMirror/modules/MMM-RecordPlayer/node_helper.js
6.	Connect the joystick and push button according to the Fritzing diagram below
![image](https://user-images.githubusercontent.com/91946874/162678989-142e8520-79f8-46b2-b3c0-a993aa8688f8.png)

### Start magic mirror
1. Download the testbutton.py
2. Run testbutton.py
```
cd Documents
python testbutton.py
```
3. Move the joystick and press the push button so that the console prints the detected actions
4. If the printed messages are correct, start MagicMirror
```
cd ~/MagicMirror
npm start
```

## Where to get help
For MagicMirror2 related questions, please refer to the official documentations or MagicMirror Forum https://forum.magicmirror.builders/

## Challenges
1. Since there is only one hardware setup, it is difficult for us to work individually or test the codes.
2. AI module cannot work in tandem with the portal module due to camera resource deadlock. Therefore we restricted the AI to work only during initialization. To change the profile, the mirror has to be restarted.
3. In the AI module, sometimes an unknown face was also recognised as a known face with a quite low score, therefore a threshold was set to filter the low score faces.
4. For unknown reason, sometimes the button and joystick do not work. To solve this, a script called testbutton.py was written. After running this script, the button and joystick would work again.
5. In the portal mode development, it was extremely difficult to publish the video on MQTT due to the asynchronous nature of Javascript and memory intensive nature of blob video chunks. This issue was overcome using correct scoping of variables and using promises.
6. The portal modules were always playing in the background. To fix this, suspend and resume functions were added to restrict them to their corresponding pages.

## Future improvements
1.The purchased mirror performs well in being reflective, yet its transparency is suboptimal especially in a bright environment. A high quality mirror and spare parts would enhance visibility and flexibility. 
2.The current setup only works on a desk and take up a lot of spaces, more compacted components can be purchased so that the mirror can be thin enough to be placed anywhere.
3.A public MQTT is used due to operational constraints. In the future, a private MQTT should be used and the videos should be transmitted in an encrypted format.
In fact, although MQTT works for short videos, an FTP server should be used for storing videos. MQTT should be used for conveying the notifications and ftp url.
4.Currently, all videos sent by the sender mirror can be viewed by everyone on the receiving mirror. In the future iterations, technical specifications should allow one profile to communicate with another profile on a separate mirror. 
5.The future product would likely be accompanied with an app which would enable users to set up the magic mirror with the nearest station, training the AI module, add a new profile and set a calendar. Users can also choose to add/remove modules or change ownership easily without delving into the code. Bu supporting login/logout facility these mirrors can be used in a public setting like hotels.

## Contributors
AbhipsaKar https://github.com/AbhipsaKar
abichoi https://github.com/abichoi
WingHongCASACE https://github.com/WingHongCASACE
Zixu Cheng https://github.com/Cheng-Zixu
