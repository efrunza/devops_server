import { NewsFeed } from "public/models/newsfeed";

export interface INewsFeedRepository{

    getAllNewsFeeds():Promise<NewsFeed[]>;
    getNewsFeedById(id:Number):Promise<NewsFeed>;
    saveNewsFeed(feed:NewsFeed):Promise<NewsFeed>;
    deleteNewsFeed(id:Number):Promise<boolean>;
    saveNewsFeedList(arrayList:string):Promise<boolean>;

}