"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("../../node_modules/mssql");
const dbFormatData_1 = require("../providers/dataFormatter/dbFormatData");
// This is the model's class.
// The model's class responsabilities are the following:
//  -   It models the business that is behind the application. 
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.
class NewsFeed {
    constructor() {
        this.id = 0;
        this.title = "";
        this.content = "";
        this.author = "";
        this.lastUpdatedDate = "";
        this.isPublished = false;
    }
    static MapDBToObject(row) {
        let newFeed = new NewsFeed();
        newFeed.id = row.id;
        newFeed.title = row.title;
        newFeed.content = row.content;
        newFeed.author = row.author;
        newFeed.isPublished = row.isPublished;
        newFeed.lastUpdatedDate = dbFormatData_1.DataFormatter.DateToString(row.lastUpdatedDate);
        return newFeed;
    }
    static MapDBToArray(results) {
        let newFeedsArray = [];
        results.recordset.forEach(function (recordset) {
            let newFeed = NewsFeed.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });
        return newFeedsArray;
    }
    static MapObjectToArray(results) {
        let newFeedsArray = [];
        results.forEach(function (recordset) {
            let newFeed = NewsFeed.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });
        return newFeedsArray;
    }
    GetDBParameters() {
        let inputParameters = [];
        if (this.id > 0) {
            inputParameters.push({ "name": "id", "dataType": sql.Int, "value": this.id });
        }
        inputParameters.push({ "name": "title", "dataType": sql.NVarChar, "value": this.title });
        inputParameters.push({ "name": "content", "dataType": sql.NVarChar, "value": this.content });
        inputParameters.push({ "name": "author", "dataType": sql.NVarChar, "value": this.author });
        inputParameters.push({ "name": "lastUpdatedDate", "dataType": sql.DateTime, "value": dbFormatData_1.DataFormatter.StringToDate(this.lastUpdatedDate) });
        inputParameters.push({ "name": "isPublished", "dataType": sql.Bit, "value": dbFormatData_1.DataFormatter.BooleanToBit(this.isPublished) });
        return inputParameters;
    }
}
exports.NewsFeed = NewsFeed;
//# sourceMappingURL=newsfeed.js.map