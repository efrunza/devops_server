import { NewsFeedRepository } from "../../../repositories/newsfeedRepository";
import { IQueriesNewsFeed } from "../../../interfaces/iQueriesNewsFeedController";
import { IQueriesNewsFeedRepository } from "../../../interfaces/iQueriesNewsFeedRepository";

// This is an example of the API controller alling directly into the repository class
// and making use only of inline queries.

class QueriesNewsFeedController implements IQueriesNewsFeed {

    private repo: IQueriesNewsFeedRepository;   
      
    constructor(router) {

        this.repo = new NewsFeedRepository();
               
        // queries
        router.get('/queries/all', this.getAllNewsFeedQuery.bind(this));
        router.get('/queries/:id', this.getNewsFeedQueryById.bind(this));
        router.get('/queries/delete/:id', this.deleteNewsFeedQuery.bind(this));
        router.post('/queries/saveNewsFeed', this.saveNewsFeedQuery.bind(this)); 
    }    

    // queries
    getAllNewsFeedQuery(req:any, res:any, next:any):void
    {

        this.repo.getAllNewsFeedQuery()
        .then
        (
            result => { return res.json(result) }
        )
        .catch(err => { next(err); })
    }

    getNewsFeedQueryById(req:any, res:any, next:any):void
    {

        let id = req.params.id;

        this.repo.getNewsFeedQueryById(id)
        .then
        (
            result => { return res.json(result) }
        )
        .catch(err => { next(err); })       
    }

    deleteNewsFeedQuery(req:any, res:any, next:any):void
    {

        let id = req.params.id;

        this.repo.deleteNewsFeedQuery(id)
        .then
        (
            result => { return res.json(result) }
        )
        .catch(err => { next(err); })
    }

    saveNewsFeedQuery(req:any, res:any, next:any):void
    {

        this.repo.saveNewsFeedQuery(req.body.newsfeed).then
        (
            newsFeed => { return res.json(newsFeed) }
        )
        .catch(err => { next(err); })
    }

}

module.exports = QueriesNewsFeedController