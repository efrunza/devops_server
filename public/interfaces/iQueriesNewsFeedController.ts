export interface IQueriesNewsFeed{

    getAllNewsFeedQuery(req:any, res:any,next:any):void;
    getNewsFeedQueryById(req:any, res:any,next:any):void;
    deleteNewsFeedQuery(req:any, res:any,next:any):void;
    saveNewsFeedQuery(req:any, res:any,next:any):void;

}