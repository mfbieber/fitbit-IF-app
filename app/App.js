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

    onTick() {
        this.displayService.makeTextDisplay(this.appState);
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
    }

}