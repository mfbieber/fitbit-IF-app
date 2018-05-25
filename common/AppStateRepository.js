import * as fs from "fs";

export default class AppStateRepository {

    jsonObject = null;

    exists() {
        let exists = true;
        try {
            fs.statSync("fastLog.json");
        }
        catch(error) {
            exists = false;
        }
        return exists;
    }

    create(status) {
        this.jsonObject = {
            "entries": [
                { "id" : 0,
                    "date": new Date('2018-05-20T10:00:30Z'),
                    "status": status }
            ]
        };
        this.save(this.jsonObject);
        return this.jsonObject;
    }

    load() {
        this.jsonObject = fs.readFileSync("fastLog.json", "json");
        return this.jsonObject;
    }

    save(jsonObject) {
        fs.writeFileSync ("fastLog.json", jsonObject, "json");
    }

    update(jsonObject, status, time) {
        this.jsonObject.entries.push({
            "id" : jsonObject["entries"].length,
                "date": time,
                "status": status });
        this.save(jsonObject);
    }
}