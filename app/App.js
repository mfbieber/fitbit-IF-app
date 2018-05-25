import * as display from "./displayFunction";
import * as fs from "fs";
import TimeService from "./TimeService.js";
import DisplayService from "./DisplayService";
import AppState from "../common/AppState";

export default class App {

    constructor() {
        this.timeService = new TimeService();
        this.displayService = new DisplayService();
        this.appState = new AppState();
    }

    onClick() {
        if (this.appState.isFasting()) {
            this.displayService.startButton();
            this.appState.startEating();
        }
        else {
            this.displayService.stopButton();
            this.appState.startFasting();
        }
        display.displayFunction();
    }

    onTick(appStateRepository) {
        display.displayFunction(appStateRepository);
    }

    init() {
        if(this.appState.firstFast()) {
            this.displayService.startUpButton();
        }
        else if(this.appState.isFasting()) {
            this.displayService.stopButton();
        }
        else {
            this.displayService.startButton()
        }
    }

}