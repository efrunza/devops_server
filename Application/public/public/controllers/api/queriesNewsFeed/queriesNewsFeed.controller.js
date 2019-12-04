"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsfeedRepository_1 = require("../../../repositories/newsfeedRepository");
// This is an example of the API controller alling directly into the repository class
// and making use only of inline queries.
class QueriesNewsFeedController {
    constructor(router) {
        this.repo = new newsfeedRepository_1.NewsFeedRepository();
        // queries
        router.get('/queries/all', this.getAllNewsFeedQuery.bind(this));
        router.get('/queries/:id', this.getNewsFeedQueryById.bind(this));
        router.get('/queries/delete/:id', this.deleteNewsFeedQuery.bind(this));
        router.post('/queries/saveNewsFeed', this.saveNewsFeedQuery.bind(this));
    }
    // queries
    getAllNewsFeedQuery(req, res, next) {
        this.repo.getAllNewsFeedQuery()
            .then(result => { return res.json(result); })
            .catch(err => { next(err); });
    }
    getNewsFeedQueryById(req, res, next) {
        let id = req.params.id;
        this.repo.getNewsFeedQueryById(id)
            .then(result => { return res.json(result); })
            .catch(err => { next(err); });
    }
    deleteNewsFeedQuery(req, res, next) {
        let id = req.params.id;
        this.repo.deleteNewsFeedQuery(id)
            .then(result => { return res.json(result); })
            .catch(err => { next(err); });
    }
    saveNewsFeedQuery(req, res, next) {
        this.repo.saveNewsFeedQuery(req.body.newsfeed).then(newsFeed => { return res.json(newsFeed); })
            .catch(err => { next(err); });
    }
}
module.exports = QueriesNewsFeedController;
//# sourceMappingURL=queriesNewsFeed.controller.js.map