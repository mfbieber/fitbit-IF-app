import clock from "clock";
import document from "document";
import * as fs from "fs";
import TimeService from "./TimeService.js";
import App from "./App.js";

let jsonObject = fs.readFileSync("json.txt", "json");
let app = new App(new TimeService());


// Update the clock every minute
clock.granularity = "minutes";

var button = document.getElementById("button");
var buttonGroup = document.getElementById("buttonGroup");
const buttonText = document.getElementById("buttonText");
let buttonCaption = ``;

let status = `nothing`;

//remove file if needed...just for dev.
//fs.unlinkSync("json.txt");

let exists = true;
try {
  fs.statSync("json.txt");
} 
catch(error) {
  exists = false;
}

if (!exists) {
  buttonCaption = `START FIRST FAST`;
  buttonText.text = buttonCaption;
  let someDay = new Date('2018-05-20T10:00:30Z');
  let fastingLog = {
      "entries": [
        { "id" : 0,
          "date": someDay,
          "status": status }
      ]  
    };
  fs.writeFileSync("json.txt", fastingLog, "json");
} 
else {
  let jsonObject = fs.readFileSync("json.txt", "json");
  let lastIndex = jsonObject["entries"].length - 1;
  
  if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
    buttonCaption = `STOP`;
  }
  else {
    buttonCaption = `START`;
  }
  buttonText.text = buttonCaption;
}

buttonGroup.onclick = () => {
  app.onClick(jsonObject);
}

clock.ontick = function(evt) {
  app.onTick();
}