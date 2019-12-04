"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envConstants_1 = require("../common/envConstants");
const newsfeedRepository_1 = require("../repositories/newsfeedRepository");
const mockNewsFeedRepository_1 = require("../repositories/mockNewsFeedRepository");
const newsfeed_1 = require("../models/newsfeed");
const autoMap_1 = require("../common/autoMap");
const js2xmlparser = require("js2xmlparser");
// The service class implements the application business logic
// The service's responsabilities are the following:
//  -   to initiate the repository class
//  -   to call into the repository's methods to get and save the data as objects.
//  -   to execute the business logic that applied to the models.
//  The service class can be mocked and the client's functionality can be tested only 
//  with the data retrieved from the mock service (JSON data) and therefore decoupled from the database.
// This service's methods called into the repository's methhods that uses stored procedures to communicate with the database.
class NewsFeedService {
    constructor() {
        let envConstants = new envConstants_1.ServerConstants();
        let envName = envConstants.getValueMap().get("ENVNAME");
        if (envName !== "test") {
            this.repo = new newsfeedRepository_1.NewsFeedRepository();
        }
        else {
            this.repo = new mockNewsFeedRepository_1.MockNewsFeedRepository();
        }
    }
    // stored procedures
    async getAllNewsFeeds(req, res, next) {
        //throw new Error('BROKEN SERVER 1.');
        let newsFeeds = [];
        await this.repo.getAllNewsFeeds()
            .then(results => newsFeeds = results)
            .catch(err => { next(err); });
        return newsFeeds;
    }
    async getNewsFeedById(req, res, next) {
        let id = req.params.id;
        let newsFeed = new newsfeed_1.NewsFeed();
        await this.repo.getNewsFeedById(id)
            .then(result => { newsFeed = result; })
            .catch(err => { next(err); });
        return newsFeed;
    }
    async saveNewsFeed(req, res, next) {
        let newsFeed = new newsfeed_1.NewsFeed();
        autoMap_1.AutoMap.Map(newsFeed, req.body.newsfeed);
        await this.repo.saveNewsFeed(newsFeed).then(result => { newsFeed = result; })
            .catch(err => { next(err); });
        return newsFeed;
    }
    async deleteNewsFeed(req, res, next) {
        let newsFeedId = req.body.newsfeed.id;
        let bIsSuccess = false;
        await this.repo.deleteNewsFeed(newsFeedId).then(result => { bIsSuccess = true; })
            .catch(err => { next(err); });
        return bIsSuccess;
    }
    async saveNewsFeedList(req, res, next) {
        let newsFeedArray = [];
        let bIsSuccess = false;
        req.body.newsfeed.forEach(reqBody => {
            let newsFeed = new newsfeed_1.NewsFeed();
            autoMap_1.AutoMap.Map(newsFeed, reqBody);
            newsFeedArray.push(newsFeed);
        });
        let newsFeedArrayXML = js2xmlparser.parse("newsFeedArray", { newsfeed: newsFeedArray });
        await this.repo.saveNewsFeedList(newsFeedArrayXML).then(newsFeed => { bIsSuccess = true; })
            .catch(err => { next(err); });
        return bIsSuccess;
    }
}
exports.NewsFeedService = NewsFeedService;
//# sourceMappingURL=newsFeedService.js.map