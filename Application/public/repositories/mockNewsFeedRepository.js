"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsfeed_1 = require("../models/newsfeed");
// This is the mock repository class that retrieves data as JSON.
class MockNewsFeedRepository {
    async getAllNewsFeeds() {
        let newsFeedJSONArray = "" +
            "[" +
            "{" +
            "\"id\":\"1\"," +
            "\"title\":\"First Title\"," +
            "\"content\": \"First Content\"," +
            "\"author\": \"First Author\"," +
            "\"lastUpdatedDate\": \"01/01/2019\"," +
            "\"ispublished\":\"true\"" +
            "}," +
            "{" +
            "\"id\":\"2\"," +
            "\"title\":\"Second Title\"," +
            "\"content\": \"Second Content\"," +
            "\"author\": \"Second Author\"," +
            "\"lastUpdatedDate\": \"02/02/2019\"," +
            "\"ispublished\":\"false\"" +
            "}" +
            "]";
        let newsFeeds = newsfeed_1.NewsFeed.MapObjectToArray(JSON.parse(newsFeedJSONArray));
        return newsFeeds;
    }
    getNewsFeedById(id) {
        throw new Error("Method not implemented.");
    }
    saveNewsFeed(feed) {
        throw new Error("Method not implemented.");
    }
    deleteNewsFeed(id) {
        throw new Error("Method not implemented.");
    }
    saveNewsFeedList(arrayList) {
        throw new Error("Method not implemented.");
    }
    getAllNewsFeedQuery() {
        throw new Error("Method not implemented.");
    }
    getNewsFeedQueryById(id) {
        throw new Error("Method not implemented.");
    }
    deleteNewsFeedQuery(id) {
        throw new Error("Method not implemented.");
    }
    saveNewsFeedQuery(feed) {
        throw new Error("Method not implemented.");
    }
}
exports.MockNewsFeedRepository = MockNewsFeedRepository;
//# sourceMappingURL=mockNewsFeedRepository.js.map