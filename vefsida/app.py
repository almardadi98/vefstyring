from flask import Flask, render_template, request
import time
import os
import subprocess
import signal
import time


def updateRGB(hexGildi):
        listiRGB = []
        temphex = hexGildi[1:-1]
        if ":" in temphex:

            words = temphex.split(':')

            for word in words:
                listiRGB.append(word)
            #þarf að finna góða leið til þess að uppfæra litina í c forritinu live
            os.system('./RGB_from_cli.py' + ' ' + listiRGB[0] + ' ' + listiRGB[1] + ' ' + listiRGB[2])
            #litir = subprocess.Popen("./colours " + listiRGB[0] + ' ' + listiRGB[1] + ' ' + listiRGB[2], shell=True, preexec_fn=os.setsid)
            listiRGB = []

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    data = request.get_json()
    if (data):
        value = data.get("RGB")
        updateRGB(value)
        print(value)
    
    return render_template('website.html')
# 10 -20 slice

@app.route('/website.html', methods=['GET', 'POST'])
def home():
    data = request.get_json()
    if (data):
        value = data.get("RGB")
        updateRGB(value)
        print(value)
    
    return render_template('website.html')

@app.route('/about.html', methods=['GET', 'POST'])
def about():
    data = request.get_json()
    if (data):
        value = data.get("RGB")
        updateRGB(value)
        print(value)
    
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
