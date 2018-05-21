import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as display from "./displayFunction.js";

// Update the clock every minute
clock.granularity = "minutes";

var button = document.getElementById("button");
var buttonGroup = document.getElementById("buttonGroup");
const buttonText = document.getElementById("buttonText");
let buttonCaption = ``;

let status = `nothing`;

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
  
  let today = display.displayFunction();
  let jsonObject = fs.readFileSync("json.txt", "json");
  let lastIndex = jsonObject["entries"].length - 1;
  
  if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
    buttonCaption = `START`;
    status = `eating`;
  }
  else {
    buttonCaption = `STOP`;
    status = `fasting`;
  }
  buttonText.text = buttonCaption;

  jsonObject.entries.push({
    "id" : jsonObject["entries"].length,
    "date": today,
    "status": status });
  fs.writeFileSync("json.txt", jsonObject, "json");
  display.displayFunction();
}

clock.ontick = function(evt) {
  display.displayFunction();
}