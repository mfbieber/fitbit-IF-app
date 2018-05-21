import document from "document";

export default class DisplayService {

    button = document.getElementById("button");

    buttonGroup(){
        return document.getElementById("buttonGroup");
    }

    buttonText() {
        return document.getElementById("buttonText")
    }

    startButton(){
        this.buttonText().text = `START`;
    }

    stopButton() {
        this.buttonText().text = `STOP`;
    }

}