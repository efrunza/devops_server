"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsFeedService_1 = require("../../../services/newsFeedService");
// The controller class is the entry point for the API calls.
// The controller's responsabilities are the following:
//      -   to implement the API calls.
//      -   to initiate the service class.
//      -   to call into the appropriate methods of the service class.
//      -   to return the service's methods results to the client.
// The controller is agnostic of the logic the service implements.
// The APIs are called via the following route: http://localhost:5200/newsfeed/ 
class NewsFeedController {
    constructor(router) {
        this.service = new newsFeedService_1.NewsFeedService();
        router.get('/', this.getAllNewsFeeds.bind(this));
        router.get('/:id', this.getNewsFeedById.bind(this));
        router.post('/saveNewsFeed', this.saveNewsFeed.bind(this));
        router.post('/saveNewsFeedList', this.saveNewsFeedList.bind(this));
        router.post('/deleteNewsFeed', this.deleteNewsFeed.bind(this));
    }
    getAllNewsFeeds(req, res, next) {
        let newsFeeds = this.service.getAllNewsFeeds(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getNewsFeedById(req, res, next) {
        this.service.getNewsFeedById(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    saveNewsFeed(req, res, next) {
        this.service.saveNewsFeed(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    deleteNewsFeed(req, res, next) {
        this.service.deleteNewsFeed(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    saveNewsFeedList(req, res, next) {
        this.service.saveNewsFeedList(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
}
module.exports = NewsFeedController;
//# sourceMappingURL=newsfeed.controller.js.map