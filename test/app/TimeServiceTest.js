import assert from "assert";
import TimeService from "../../app/TimeService";

describe('TimeService', function() {
    describe('#today()', function() {
        it('should return a date object', function() {
            let timeService = new TimeService();
            let today = timeService.today();
            assert.ok(today instanceof Date);
        });
    });
});