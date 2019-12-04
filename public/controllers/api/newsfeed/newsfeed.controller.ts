import { INewsFeed} from "../../../interfaces/iNewsFeedController";
import { INewsFeedService } from "../../../interfaces/iNewsFeedService";
import { NewsFeedService } from "../../../services/newsFeedService";

// The controller class is the entry point for the API calls.
// The controller's responsabilities are the following:

//      -   to implement the API calls.
//      -   to initiate the service class.
//      -   to call into the appropriate methods of the service class.
//      -   to return the service's methods results to the client.

// The controller is agnostic of the logic the service implements.
// The APIs are called via the following route: http://localhost:5200/newsfeed/ 

class NewsFeedController implements INewsFeed {

    private service: INewsFeedService;   
      
    constructor(router) {
        
        this.service = new NewsFeedService();      
                          
        router.get('/', this.getAllNewsFeeds.bind(this));
        router.get('/:id', this.getNewsFeedById.bind(this));
        router.post('/saveNewsFeed', this.saveNewsFeed.bind(this)); 
        router.post('/saveNewsFeedList', this.saveNewsFeedList.bind(this));     
        router.post('/deleteNewsFeed', this.deleteNewsFeed.bind(this));       
    }    

    getAllNewsFeeds(req:any, res:any, next:any):void
    {
        let newsFeeds = this.service.getAllNewsFeeds(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })                
    }

    getNewsFeedById(req:any, res:any, next:any):void
    {
        this.service.getNewsFeedById(req,res,next).then(
            results => res.json(results)
        ).
        catch (err => { next(err); })    
    }

    saveNewsFeed(req:any, res:any, next:any):void
    {
        this.service.saveNewsFeed(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })    
    }

    deleteNewsFeed(req:any, res:any, next:any):void
    {
        this.service.deleteNewsFeed(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })    
    }

    saveNewsFeedList(req:any, res:any, next:any):void
    {
        this.service.saveNewsFeedList(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })    
    }

}

module.exports = NewsFeedController