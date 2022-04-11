import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(15, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(26, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(10, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(16, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(9, GPIO.IN, pull_up_down = GPIO.PUD_UP)

tries = 0

while(tries < 200):
	if GPIO.input(15):
		print("Regular Button Pressed")
	elif GPIO.input(10) == GPIO.LOW:
		print("Joystick up")
	elif GPIO.input(17)== GPIO.LOW:
		print("Joystick down")
	elif GPIO.input(16)== GPIO.LOW:
		print("Joystick left")
	elif GPIO.input(9)== GPIO.LOW:
		print("Joystick right")
	elif GPIO.input(26):
		print("Light Push Button Pressed")	
	else:
		print("No button")
	time.sleep(0.5)
	tries = tries + 1
