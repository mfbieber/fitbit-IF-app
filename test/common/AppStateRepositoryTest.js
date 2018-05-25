import assert from "assert";
import AppState from "../../common/AppState";
import AppStateRepository from "../../common/AppStateRepository";

describe('AppStateRepository', function() {
    let appStateRepository = null;
    let appState = new AppState();
    before(function() {
        appStateRepository = new AppStateRepository();
    });
    describe('#exists()', function() {
        it('', function() {

        });
    });
    describe('#create()', function() {
        it('should return a jsonObject with status "nothing".', function() {
            appState.startingUp(appStateRepository);
            let jsonObject = appStateRepository.create(appState);
            let newStatus = appState.status;
            assert.equal(newStatus, `nothing`);
        });
    });
});