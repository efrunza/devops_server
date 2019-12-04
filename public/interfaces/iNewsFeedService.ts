import { NewsFeed } from "../models/newsfeed";

export interface INewsFeedService{

    getAllNewsFeeds(req:any, res:any,next:any):Promise<NewsFeed[]>;
    getNewsFeedById(req:any, res:any,next:any):Promise<NewsFeed>;
    saveNewsFeed(req:any, res:any,next:any):Promise<NewsFeed>;
    deleteNewsFeed(req:any, res:any,next:any):Promise<boolean>;
    saveNewsFeedList(req:any, res:any,next:any):Promise<boolean>;   

}