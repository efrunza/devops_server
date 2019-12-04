export interface INewsFeed{

    getAllNewsFeeds(req:any, res:any,next:any):void;
    getNewsFeedById(req:any, res:any,next:any):void;
    saveNewsFeed(req:any, res:any,next:any):void;
    deleteNewsFeed(req:any, res:any,next:any):void;
    saveNewsFeedList(req:any, res:any,next:any):void;   

}