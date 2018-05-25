import document from "document";
import DisplayService from "./DisplayService";

export default class TextDisplay {

    textDisplayFasting(period) {
        this.ifStartText().text = `last started: ${period.lastStarted()}`;
        if (period.belowTargetTime){
            this.ifEndText().text = `will end in: ${period.willEndIn}`;
            this.ifEndTimeText().text = `will end at: ${period.willEndAt}`;
        }
        else {
            this.ifEndText().text = `Break fast!`;
            this.ifEndTimeText().text = `exceeded by: ${period.exceededTime}`;
        }
    }

    textDisplayEating() {
        this.ifStartText().text = `breakfast at: ${period.lastEndedd()}`;
        if (period.belowTargetTime){
            this.ifEndText().text = `start fast in: ${period.willEndIn}`;
            this.ifEndTimeText().text = `start fast at: ${period.willEndAt}`;
        }
        else {
            this.ifEndText().text = `Start fast!`;
            this.ifEndTimeText().text = `exceeded by: ${period.exceededTime}`;
        }
    }

    appTitle() {
        document.getElementById("appTitle").text = `INTERMITTENT FASTING`;
    }

    ifStartText() {
        document.getElementById("ifStart").text = ``;
    }

    ifEndText() {
        document.getElementById("ifEnd").text = ``;
    }

    ifEndTimeText() {
        document.getElementById("ifEndTime").text = ``;
    }

    buttonGroup(){
        return document.getElementById("buttonGroup");
    }

    buttonText() {
        return document.getElementById("buttonText")
    }

    startUpButton(){
        this.buttonText().text = `START FIRST FAST`;
    }

    startButton(){
        this.buttonText().text = `START`;
    }

    stopButton() {
        this.buttonText().text = `STOP`;
    }

}