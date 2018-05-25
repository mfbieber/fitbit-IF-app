import clock from "clock";
import document from "document";
import TimeService from "./TimeService.js";
import App from "./App.js";
import DisplayService from "./DisplayService";
import AppState from "../common/AppState";
import AppStateRepository from "../common/AppStateRepository";
let appStateRepository = new AppStateRepository();

let displayService = new DisplayService();
let app = new App(new TimeService(), displayService, new AppState(appStateRepository));


// Update the clock every minute
clock.granularity = "minutes";

let btnBR = document.getElementById("btn-br");
btnBR.onactivate = function(evt) {
    console.log("config button!");
}

let status = `nothing`;

//remove file if needed...just for dev.
//fs.unlinkSync("json.txt");



if (!appStateRepository.exists()) {
  displayService.buttonText().text = `START FIRST FAST`;
  let someDay = new Date('2018-05-20T10:00:30Z');
  appStateRepository.save(appStateRepository.create());
} 
else {
  let jsonObject = appStateRepository.load();
  let lastIndex = jsonObject["entries"].length - 1;
  
  if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
      displayService.stopButton();
  }
  else {
      displayService.startButton();
  }
}

displayService.buttonGroup().onclick = () => {
  app.onClick(appStateRepository.load());
}

clock.ontick = function(evt) {
  app.onTick();
}