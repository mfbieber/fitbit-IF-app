import AppStateRepository from "../common/AppStateRepository";

export default class AppState {

    status = `nothing`;

    constructor() {
        this.appStateRepository = new AppStateRepository;
    }

    firstFast () {
        //does a log file exist? If not, this is the very first fast.
        if (!this.appStateRepository.exists()) {
            this.isFasting(this.appStateRepository);
            this.appStateRepository.create(status);
            return true;
        }
        //If we have a log file, then set the status to the last logged status.
        else {
            if (this.isFasting()) {
                this.status = `fasting`;
            }
            else if (this.isEating()) {
                this.status = `eating`;
            }
        }
    }

    startFasting(time) {
        this.status = `fasting`;
        this.appStateRepository.update(this.appStateRepository.load(), this.status, time);
    }

    startEating(time) {
        this.status = `eating`;
        this.appStateRepository.update(this.appStateRepository.load(), this.status, time);
    }

    isFasting() {
        let jsonObject = this.appStateRepository.load();
        let lastIndex = jsonObject["entries"].length - 1;
        if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
            return true;
        }
        else {
            return false;
        }
    }

    isEating() {
        let jsonObject = this.appStateRepository.load();
        let lastIndex = jsonObject["entries"].length - 1;
        if (jsonObject["entries"][lastIndex]["status"] == `eating`) {
            return true;
        }
        else {
            return false;
        }
    }

    isFastingSince() {

    }

    isEatingSince() {

    }
}