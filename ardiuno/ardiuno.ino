String data;

void setup() {
  // initialize digital pin LED_BUILTIN as an output.

  Serial.begin(9600); // Begen listening on port 9600 for serial
  
  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, LOW);
}

// the loop function runs over and over again forever
void loop() {
   if(Serial.available() > 0){
      data = Serial.readString();
    }
    
    if(data=="on"){
      digitalWrite(LED_BUILTIN, HIGH); 
    }
    else if(data=="off"){
      digitalWrite(LED_BUILTIN, LOW);
    }
    Serial.println(analogRead(0));
    delay(100);
}
