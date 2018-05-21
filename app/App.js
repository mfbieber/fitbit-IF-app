import * as display from "./displayFunction";
import * as fs from "fs";
import TimeService from "./TimeService.js";
import DisplayService from "./DisplayService";

export default class App {

    jsonObject = null;

    /**
     *
     * @type {TimeService}
     */
    timeService = null;

    /**
     *
     * @type {DisplayService}
     */
    displayService = null;

    constructor(timeService, displayService) {
        this.timeService = timeService;
        this.displayService = displayService;
    }

    onClick(jsonObject) {

        let lastIndex = jsonObject["entries"].length - 1;
        let status = `nothing`;

        if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
            this.displayService.startButton();
            status = `eating`;
        }
        else {
            this.displayService.stopButton();
            status = `fasting`;
        }

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