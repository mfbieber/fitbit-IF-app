import clock from "clock";
import document from "document";
import App from "./App.js";

let app = new App();

let btnBR = document.getElementById("btn-br");
btnBR.onactivate = function(evt) {
    console.log("config button!");
}

//remove file if needed...just for dev.
//fs.unlinkSync("json.txt");

app.init();

// Update the clock every minute
clock.granularity = "minutes";
clock.ontick = function(evt) {
    app.onTick();
}
