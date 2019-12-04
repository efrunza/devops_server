import { INewsFeedRepository } from "../interfaces/iNewsFeedRepository";
import {NewsFeed} from "../models/newsfeed";

// This is the mock repository class that retrieves data as JSON.

export class MockNewsFeedRepository implements INewsFeedRepository
{
    async getAllNewsFeeds(): Promise<NewsFeed[]> {
        
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

        let newsFeeds = NewsFeed.MapObjectToArray(JSON.parse(newsFeedJSONArray));
            
        return newsFeeds;
    }   

    getNewsFeedById(id: Number): Promise<NewsFeed> {
        throw new Error("Method not implemented.");
    }
    saveNewsFeed(feed: NewsFeed): Promise<NewsFeed> {
        throw new Error("Method not implemented.");
    }
    deleteNewsFeed(id: Number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    saveNewsFeedList(arrayList: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAllNewsFeedQuery(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getNewsFeedQueryById(id: Number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteNewsFeedQuery(id: Number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    saveNewsFeedQuery(feed: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}