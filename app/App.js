import * as display from "./displayFunction";
import * as fs from "fs";
import TimeService from "./TimeService.js";
import DisplayService from "./DisplayService";
import AppState from "../common/AppState";

export default class App {

    /**
     *
     * @type {AppState}
     */
    appState = null;

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

    constructor(timeService, displayService, appState) {
        this.timeService = timeService;
        this.displayService = displayService;
        this.appState = appState;
    }

    onClick(jsonObject, appState, appStateRepository) {

        if (appState.isFasting()) {
            this.displayService.startButton();
            appState.startEating();
        }
        else {
            this.displayService.stopButton();
            appState.startFasting();
        }

        appStateRepository.update(jsonObject, appState, this.timeService.today());
        appStateRepository.save();

        jsonObject.entries.push({
            "id" : jsonObject["entries"].length,
            "date": this.timeService.today(),
            "status": appState.status });
        fs.writeFileSync("json.txt", jsonObject, "json");
        display.displayFunction();
    }

    onTick() {
        display.displayFunction(appStateRepository);
    }

    init() {

    }

}