#! /usr/bin/env python
#
# Fade an LED (or one color of an RGB LED) using GPIO's PWM capabilities.
#
# Usage:
#   sudo python colors.py 255 255 255
#
# @author Jeff Geerling, 2015

import argparse
import time
import RPi.GPIO as GPIO


# LED pin mapping.
red =  17
green = 18
blue = 27
# thetta er GPIO numer ekki pinna numerin
# GPIO setup.
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(red, GPIO.OUT)
GPIO.setup(green, GPIO.OUT)
GPIO.setup(blue, GPIO.OUT)

# Set up colors using PWM so we can control individual brightness.
RED = GPIO.PWM(red, 100)
GREEN = GPIO.PWM(green, 100)
BLUE = GPIO.PWM(blue, 100)
RED.start(0)
GREEN.start(0)
BLUE.start(0)

# Set a color by giving R, G, and B values of 0-255.
def setColor(rgb = []):
    # Convert 0-255 range to 0-100.
    rgb = [(x / 255.0) * 100 for x in rgb]
    RED.ChangeDutyCycle(100-rgb[0])
    GREEN.ChangeDutyCycle(100-rgb[1])
    BLUE.ChangeDutyCycle(100-rgb[2])

time.sleep(2)

GPIO.cleanup()
