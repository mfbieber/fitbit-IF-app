import document from "document";
import TextDisplay from "./TextDisplay";

export default class DisplayService {

    button = document.getElementById("button");

    makeTextDisplay(appState) {
        this.textDisplay = new TextDisplay();
        this.textDisplay.appTitle();
        if(appState.isFasting()) {
            this.textDisplay.textDisplayFasting();
        }
        else if(appState.isEating()) {
            this.textDisplay.textDisplayEating();
        }
    }

    appTitle() {
        return docment.getElementById("appTitle");
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