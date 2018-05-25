import clock from "clock";
import document from "document";
import App from "./App.js";

let app = new App();


// Update the clock every minute
clock.granularity = "minutes";

let btnBR = document.getElementById("btn-br");
btnBR.onactivate = function(evt) {
    console.log("config button!");
}

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