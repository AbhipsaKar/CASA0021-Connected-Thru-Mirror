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
2.	run following command in home folder to install mqtt: 
cd MagicMirror 
npm install mqtt
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

## Contributors
AbhipsaKar https://github.com/AbhipsaKar
abichoi https://github.com/abichoi
WingHongCASACE https://github.com/WingHongCASACE
Zixu Cheng https://github.com/Cheng-Zixu
