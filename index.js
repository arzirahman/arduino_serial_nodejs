const fs = require('fs');
const homePage = fs.readFileSync('index.html','utf-8');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const serverPort = 80;
app.use(bodyParser.urlencoded({ extended: true }));

const {SerialPort} = require("serialport");
const serialPort = "COM7";
const serial = new SerialPort({
    path:serialPort,
    baudRate: 9600
});

const analogRead = {
    a0:undefined
}

let temp = '';

serial.on('open',function() {
  console.log('Serial Port ' + serialPort + ' is opened...');
});

serial.on('data',(dataChunk)=>{
    temp += dataChunk.toString();
    if(temp.indexOf('\n') > 0){
        analogRead.a0 = temp.split('\n')[0].split('\r')[0];
        temp = '';
    }
});

app.get('/', function (req, res) {
    res.send(homePage);
});

app.post('/api/a0',(req,res)=>{
    if(req.body.key = "kampred"){
        res.end(JSON.stringify(analogRead)); 
    }
    else{
        res.status(404);
    }
});

// app.get('/lol',(_,res)=>{
//     const response = [
//         {
//             suhu:69
//         },
//         {
//             suhu:76
//         }
//     ]
//     res.end(JSON.stringify(response));  
// });

app.post('/',(req,res)=>{
    if(req.body.led == 'on'){
        serial.write("on");
    } 
    else if(req.body.led == 'off') {
        serial.write("off");
    }
    res.status(200);
});

app.listen(serverPort, function () {
  console.log('Server listening on port' + serverPort + ' ...');
});