"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const newsfeed_1 = require("../models/newsfeed");
const sqlDBPovider_1 = require("../providers/dbProvider/sqlDBPovider");
const dbFormatData_1 = require("../providers/dataFormatter/dbFormatData");
// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:
//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.
//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)
class NewsFeedRepository {
    constructor() { }
    ;
    //stored procedures
    async getAllNewsFeeds() {
        //throw new Error('BROKEN SERVER 2.');
        let newFeedsArray = [];
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = [];
        await provider.executeSPWithParameters('sp_GetAllNewsFeeds', inputParameters).then(results => {
            if (results) {
                newFeedsArray = newsfeed_1.NewsFeed.MapDBToArray(results);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return newFeedsArray;
    }
    async getNewsFeedById(id) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let newFeed = new newsfeed_1.NewsFeed();
        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];
        await provider.executeSPWithParameters('dbo.sp_GetNewsFeedById', inputParameters).then(results => {
            if (results) {
                newFeed = newsfeed_1.NewsFeed.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return newFeed;
    }
    async deleteNewsFeed(newsFeedId) {
        let returnValue = true;
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = [{ name: "id", dataType: sql.Int, value: newsFeedId }];
        await provider.executeSPWithParameters('sp_DeleteNewsFeed', inputParameters)
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return returnValue;
    }
    async saveNewsFeed(newsFeed) {
        let dbNewsFeed = new newsfeed_1.NewsFeed();
        if (newsFeed.id > 0) {
            await this.updateNewsFeed(newsFeed).then(result => {
                dbNewsFeed = result;
            });
        }
        else {
            await this.insertNewsFeed(newsFeed).then(result => {
                dbNewsFeed = result;
            });
        }
        return dbNewsFeed;
    }
    async saveNewsFeedList(newsFeedArrayXML) {
        let returnValue = true;
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = [{ name: "input", dataType: sql.Xml, value: newsFeedArrayXML }];
        let outputParameters = [{ name: "outputValue", dataType: sql.VarChar, value: "" }];
        provider.executeSPWithParametersAndOutputParameter('dbo.sp_SaveNewsFeedList', inputParameters, outputParameters)
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return returnValue;
    }
    async insertNewsFeed(newsFeed) {
        let dbNewsFeed = new newsfeed_1.NewsFeed();
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = newsFeed.GetDBParameters();
        await provider.executeSPWithParameters('sp_InsertNewsFeed', inputParameters).then(results => {
            if (results) {
                dbNewsFeed = newsfeed_1.NewsFeed.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return dbNewsFeed;
    }
    async updateNewsFeed(newsFeed) {
        let dbNewsFeed = new newsfeed_1.NewsFeed();
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = newsFeed.GetDBParameters();
        await provider.executeSPWithParameters('sp_UpdateNewsFeed', inputParameters).then(results => {
            if (results) {
                dbNewsFeed = newsfeed_1.NewsFeed.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return dbNewsFeed;
    }
    // queries
    async getAllNewsFeedQuery() {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = [];
        await provider.executeQuery('select id, title, content, author, lastUpdatedDate, isPublished from dbo.NewsFeed', inputParameters).then(results => {
            if (results) {
                recordset = results.recordset;
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    async getNewsFeedQueryById(id) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];
        await provider.executeQuery('select id, title, content, author, lastUpdatedDate, isPublished from dbo.NewsFeed where id =@id', inputParameters).then(results => {
            if (results) {
                recordset = results.recordset[0];
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    async saveNewsFeedQuery(newsFeed) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let rowsAffected = null;
        let statement = "";
        let inputParameters = [];
        if (newsFeed.id > 0) {
            statement = 'update dbo.NewsFeed set title=@title, content=@content, author=@author, lastUpdatedDate = @lastUpdatedDate, isPublished = @isPublished where id = @id';
            inputParameters.push({ "name": "id", "dataType": sql.Int, "value": newsFeed.id });
        }
        else {
            statement = 'insert into dbo.NewsFeed values(@title, @content, @author, @lastUpdatedDate, @isPublished)';
        }
        inputParameters.push({ "name": "title", "dataType": sql.NVarChar, "value": newsFeed.title });
        inputParameters.push({ "name": "content", "dataType": sql.NVarChar, "value": newsFeed.content });
        inputParameters.push({ "name": "author", "dataType": sql.NVarChar, "value": newsFeed.author });
        inputParameters.push({ "name": "lastUpdatedDate", "dataType": sql.DateTime, "value": dbFormatData_1.DataFormatter.StringToDate(newsFeed.lastUpdatedDate) });
        inputParameters.push({ "name": "isPublished", "dataType": sql.Bit, "value": dbFormatData_1.DataFormatter.BooleanToBit(newsFeed.isPublished) });
        await provider.executeQuery(statement, inputParameters).then(result => {
            rowsAffected = result.rowsAffected[0];
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return rowsAffected;
    }
    async deleteNewsFeedQuery(id) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let rowsAffected = null;
        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];
        await provider.executeQuery('delete from dbo.NewsFeed where id = @id', inputParameters).then(results => {
            if (results) {
                rowsAffected = results.rowsAffected;
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return rowsAffected;
    }
    logErrorsCommon(err, provider) {
        // log errors into database
        provider.executeSPWithParameters('sp_LogErrors', [
            { name: "errorMessage", dataType: sql.NVarChar, value: err },
            { name: "errorStack", dataType: sql.NVarChar, value: err.stack.split("\n") }
        ]);
        return new Promise((resolve, reject) => {
            reject("The server encounters an error.");
        });
    }
}
exports.NewsFeedRepository = NewsFeedRepository;
//# sourceMappingURL=newsfeedRepository.js.map