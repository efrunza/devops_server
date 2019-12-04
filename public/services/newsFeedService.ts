import { ServerConstants } from "../common/envConstants";
import { INewsFeedService } from "../interfaces/iNewsFeedService";
import { INewsFeedRepository } from "../interfaces/iNewsFeedRepository";
import { NewsFeedRepository } from "../repositories/newsfeedRepository";
import { MockNewsFeedRepository } from "../repositories/mockNewsFeedRepository";
import { NewsFeed } from "../models/newsfeed";
import { AutoMap } from "../common/autoMap";
import * as js2xmlparser from  "../../Application/node_modules/js2xmlparser";

// The service class implements the application business logic
// The service's responsabilities are the following:

//  -   to initiate the repository class
//  -   to call into the repository's methods to get and save the data as objects.
//  -   to execute the business logic that applied to the models.

//  The service class can be mocked and the client's functionality can be tested only 
//  with the data retrieved from the mock service (JSON data) and therefore decoupled from the database.

// This service's methods called into the repository's methhods that uses stored procedures to communicate with the database.

export class NewsFeedService implements INewsFeedService {

    private repo: INewsFeedRepository;   
      
    constructor() {

        let envConstants = new ServerConstants(); 
        let envName = envConstants.getValueMap().get("ENVNAME");
        
        if (envName !== "test")
        {
            this.repo = new NewsFeedRepository();
        }
        else
        {
            this.repo = new MockNewsFeedRepository();
        }                                
    }    
    
   // stored procedures
   async getAllNewsFeeds(req:any, res:any, next:any):Promise<NewsFeed[]>
   {
       //throw new Error('BROKEN SERVER 1.');

       let newsFeeds:NewsFeed[] = [];

       await this.repo.getAllNewsFeeds()
       .then
       (
           results => newsFeeds = results
       )
       .catch(err => { next(err); })     
       
       return newsFeeds;
   }

   async getNewsFeedById(req:any, res:any, next:any):Promise<NewsFeed>
   {

       let id = req.params.id;
       let newsFeed = new NewsFeed();

       await this.repo.getNewsFeedById(id)
       .then
       (
           result => {newsFeed = result}
       )
       .catch(err => { next(err); })    
       
       return newsFeed;
   }

   async saveNewsFeed(req:any, res:any, next:any):Promise<NewsFeed>
   {
       let newsFeed: NewsFeed = new NewsFeed();

       AutoMap.Map(newsFeed,req.body.newsfeed);

       await this.repo.saveNewsFeed(newsFeed).then
       (
           result => {newsFeed = result}
       )
       .catch(err => { next(err); })  
       
       return newsFeed;
   }

   async deleteNewsFeed(req:any, res:any, next:any):Promise<boolean>
   {
       let newsFeedId = req.body.newsfeed.id;
       let bIsSuccess = false;

       await this.repo.deleteNewsFeed(newsFeedId).then
       (
           result => {bIsSuccess = true}
       )
       .catch(err => { next(err); })

       return bIsSuccess;
   }

   async saveNewsFeedList(req:any, res:any, next:any):Promise<boolean>
   {
       let newsFeedArray: NewsFeed[] = [];
       let bIsSuccess = false;

       req.body.newsfeed.forEach(reqBody => {

           let newsFeed: NewsFeed = new NewsFeed();
           AutoMap.Map(newsFeed, reqBody);
           newsFeedArray.push(newsFeed);
       });

       let newsFeedArrayXML = js2xmlparser.parse("newsFeedArray", { newsfeed: newsFeedArray });

       await this.repo.saveNewsFeedList(newsFeedArrayXML).then
       (
           newsFeed => {bIsSuccess = true;}
       )
       .catch(err => { next(err); })    
       
       return bIsSuccess;
   }

}
