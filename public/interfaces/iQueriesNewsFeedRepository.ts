import { NewsFeed } from "public/models/newsfeed";

export interface IQueriesNewsFeedRepository{

    getAllNewsFeedQuery():Promise<any>;
    getNewsFeedQueryById(id:Number):Promise<any>;
    deleteNewsFeedQuery(id:Number):Promise<any>;
    saveNewsFeedQuery(feed:any):Promise<any>;

}