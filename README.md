# Humeter
Humidity and temperature monitoring with Arduino and Socket.IO

## Introduction
Humeter is a project that combines Arduino and Socket.IO, with the aim of taking data on humidity and ambient temperature, for showing it in a real-time web application.

## Requirements

### Hardware
 - Arduino UNO or similar
 - DHT22 sensor or similar

### Software
 - Node.js
 - Bower

## Installation
Go to the project directory. Then, just enter the following commands in the terminal:<br/>
```
npm install
bower install
```

## Configuration
Indicate the USB port you want to use (by default, `/dev/ttyUSB0`) in `index.js`, line `6`.

Also, you can adjust the time interval between each reading, changing the argument of the call to `delay()` function in `arduino/humeter.ino`, line `27`.

> No need to worry about anything else, because the server adapts itself.

## Start
 1. Upload the sketch placed in `arduino/humeter.ino` to your Arduino and keep it connected to an USB port.
 2. Go to the project directory and enter the following command in the terminal:
```
npm start
```

> You must grant permissions to the server to read data via the USB port.
