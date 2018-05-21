import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as fs from "fs";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const appTitle = document.getElementById("appTitle");
const ifStart = document.getElementById("ifStart");
const ifEnd = document.getElementById("ifEnd");
const ifEndTime = document.getElementById("ifEndTime");
const eatTime = 8;
const fastTime = 16;

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

let displayFunction = function() {
  
  let jsonObject = fs.readFileSync("json.txt", "json");
  let lastIndex = jsonObject["entries"].length - 1;
  let today = new Date();
  appTitle.text = `INTERMITTENT FASTING`;
    
  if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
    let date = new Date(jsonObject["entries"][lastIndex]["date"]);
    let hoursStarted = util.zeroPad(date.getHours());
    let minsStarted = util.zeroPad(date.getMinutes());
    ifStart.text = `last started: ${hoursStarted}:${minsStarted}`;

    let timePassed = today - date;
    let minutesPassed = Math.floor(timePassed/(60*1000));
    let hoursPassed = Math.floor(timePassed/(60*60*1000));
    let fastingTime = fastTime*60*60*1000;

    if (timePassed <= fastingTime) {
      let timeRemaining = fastingTime - timePassed;
      let hoursRemaining = Math.floor(timeRemaining/(60*60*1000));
      let minsRemaining = Math.floor(timeRemaining/(60*1000));
      let endTime = new Date(today.getTime() + timeRemaining);
      let endTimeHours = util.zeroPad(endTime.getHours());
      let endTimeMins = util.zeroPad(endTime.getMinutes());
      ifEnd.text = `will end in: ${hoursRemaining} h ${minsRemaining - hoursRemaining*60} min`;
      ifEndTime.text = `will end at: ${endTimeHours}:${endTimeMins}`;
    }
    else {
      let timeOverTarget = timePassed - fastingTime;
      let hoursOver = Math.floor(timeOverTarget/(60*60*1000));
      let minsOver = Math.floor(timeOverTarget/(60*1000));
      ifEnd.text = `Break fast!`;
      ifEnd.text = `exceeded by: ${hoursOver} h ${minsOver - hoursOver*60} min`;
    }
  }
  else if (jsonObject["entries"][lastIndex]["status"] == `eating`) {
    let date = new Date(jsonObject["entries"][lastIndex]["date"]);
    let hoursEnded = util.zeroPad(date.getHours());
    let minsEnded = util.zeroPad(date.getMinutes());
    ifStart.text = `breakfast at: ${hoursEnded}:${minsEnded}`;
    
    let timePassed = today - date;
    let minutesPassed = Math.floor(timePassed/(60*1000));
    let hoursPassed = Math.floor(timePassed/(60*60*1000));
    let eatingTime = eatTime*60*60*1000;
    
    if (timePassed <= eatingTime) {
      let timeRemaining = eatingTime - timePassed;
      let hoursRemaining = Math.floor(timeRemaining/(60*60*1000));
      let minsRemaining = Math.floor(timeRemaining/(60*1000));
      let endTime = new Date(today.getTime() + timeRemaining);
      let endTimeHours = util.zeroPad(endTime.getHours());
      let endTimeMins = util.zeroPad(endTime.getMinutes());
      ifEnd.text = `start fast in: ${hoursRemaining} h ${minsRemaining - hoursRemaining*60} min`;
      ifEndTime.text = `start fast at: ${endTimeHours}:${endTimeMins}`;
    }
    else {
      let timeOverTarget = timePassed - eatingTime;
      let hoursOver = Math.floor(timeOverTarget/(60*60*1000));
      let minsOver = Math.floor(timeOverTarget/(60*1000));
      ifEnd.text = `Start fast!`;
      ifEndTime.text = `exceeded by: ${hoursOver} h ${minsOver - hoursOver*60} min`;
    }
  }
  return today;
}

buttonGroup.onclick = () => {

  let today = displayFunction();
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
  displayFunction();
  
}

clock.ontick = function(evt) {
  displayFunction();
}

