import clock from "clock";
import DisplayService from "./DisplayService";
import AppState from "../common/AppState";

export default class App {

    constructor() {
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
        this.displayService.makeTextDisplay(this.appState);
    }

    onTick(appState) {
        this.displayService.makeTextDisplay(appState);
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

        this.displayService.buttonGroup().onclick = () => {
            this.onClick();
        }

        // Update the clock every minute
        clock.granularity = "minutes";
        clock.ontick = function(evt) {
            this.onTick();
        }
    }

}