import * as display from "./displayFunction";
import TimeService from "./TimeService.js";

export default class App {

    jsonObject = null;

    /**
     *
     * @type {TimeService}
     */
    timeService = null;

    constructor(timeService) {
        this.timeService = timeService;
    }

    onClick(jsonObject) {

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
            "date": this.timeService.today(),
            "status": status });
        fs.writeFileSync("json.txt", jsonObject, "json");
        display.displayFunction();
    }

    onTick() {
        display.displayFunction();
    }

    init() {

    }

}