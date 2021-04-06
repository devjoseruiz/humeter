#include "DHT.h"
#define DHTPIN 2 // Define sensor pin
#define DHTTYPE DHT22 // Define sensor model

DHT dht(DHTPIN, DHTTYPE);

void setup(){
  Serial.begin(9600);
  dht.begin();
}

void loop(){
  float hum = dht.readHumidity(); // Read humidity
  float temp = dht.readTemperature(); // Read temperature

  // If it isn't a number, do nothing...
  if(isnan(hum) || isnan(temp))
    return;

  // Send a "fake" JSON throught serial port
  Serial.print("{\"h\": ");
  Serial.print(hum);
  Serial.print(", \"t\": ");
  Serial.print(temp);
  Serial.print("}");

  delay(5000); // Set your prefered delay here...
}