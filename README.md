# CASA0021-Connected-Thru-Mirror
Group project prototype created for CASA0021 module

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
9.	3D printer
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

### Installation
1.	Install MagicMirror2 on Raspberry Pi
2.	run npm install mqtt in MagicMirror home folder
3.	Replace the config, css and modules folder in the MagicMirror
4.	Unzip the node_modules file in MMM-Buttons, MMM-Carousel2, MMM-TFL-Arrivals-Modified
5.	Edit the config.js file in the config folder by adding the api keys into it
6.	Connect the joystick and push button according to the Fritzing diagram below
![image](https://user-images.githubusercontent.com/91946874/162678989-142e8520-79f8-46b2-b3c0-a993aa8688f8.png)

## Where to get help
For MagicMirror2 related questions, please refer to the official documentations or MagicMirror Forum https://forum.magicmirror.builders/

## Contributors
AbhipsaKar https://github.com/AbhipsaKar
abichoi https://github.com/abichoi
WingHongCASACE https://github.com/WingHongCASACE
Zixu Cheng https://github.com/Cheng-Zixu
