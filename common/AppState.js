import AppStateRepository from "../common/AppStateRepository";

export default class AppState {

    status = `nothing`;

    /**
     *
     * @type {AppStateRepository}
     */
    appStateRepository = null;

    constructor(appStateRepository) {
        this.appStateRepository = appStateRepository;
    }

    startingUp (appStateRepository) {
        //does a log file exist? If not, this is the very first fast.
        if (!appStateRepository.exists()) {
            displayService.startUpButton();
            appStateRepository.save(appStateRepository.create());
        }
        else {
            let jsonObject = appStateRepository.load();
            let lastIndex = jsonObject["entries"].length - 1;

            if (this.isFasting()) {
                displayService.stopButton();
            }
            else {
                displayService.startButton();
            }
        }

    }

    startFasting(jsonObject, appState, timeService, appStateRepository) {
        this.status = `fasting`;
        appStateRepository.update(jsonObject, appState, timeService.today());
    }

    startEating(jsonObject, appState, timeService, appStateRepository) {
        this.status = `eating`;
        appStateRepository.update(jsonObject, appState, timeService.today());
    }

    isFasting(appStateRepository) {
        let jsonObject = appStateRepository.load();
        let lastIndex = jsonObject["entries"].length - 1;
        if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
            return true;
        }
        else {
            return false;
        }
    }

    isEating(appStateRepository) {
        let jsonObject = appStateRepository.load();
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