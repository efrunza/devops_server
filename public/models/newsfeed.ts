import * as sql from '../../Application/node_modules/mssql';
import { DataFormatter } from "../providers/dataFormatter/dbFormatData";

// This is the model's class.

// The model's class responsabilities are the following:

//  -   It models the business that is behind the application. 
//  -   It contains methods to help mapping json into the model.
//  -   It contains methods to construct the parameters list used for the db calls.

export class NewsFeed {

    public id: number = 0;   
    public title: string = "";
    public content: string = "";
    public author: string = "";
    public lastUpdatedDate: string = "";
    public isPublished: boolean = false;

    constructor() {}

    public static MapDBToObject(row: any): NewsFeed{

        let newFeed: NewsFeed = new NewsFeed();

        newFeed.id = row.id;
        newFeed.title = row.title;
        newFeed.content = row.content;
        newFeed.author = row.author;
        newFeed.isPublished = row.isPublished;             
        newFeed.lastUpdatedDate = DataFormatter.DateToString(row.lastUpdatedDate);

        return newFeed;
    }

    public static MapDBToArray(results: any): NewsFeed[] {

        let newFeedsArray: NewsFeed[] = [];

        results.recordset.forEach(function (recordset) {
            let newFeed = NewsFeed.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });       

        return newFeedsArray;
    }

    public static MapObjectToArray(results: any): NewsFeed[] {

        let newFeedsArray: NewsFeed[] = [];

        results.forEach(function (recordset) {
            let newFeed = NewsFeed.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });

        return newFeedsArray;
    }

    public GetDBParameters(): any[] {

        let inputParameters = [];

        if (this.id > 0) {
            inputParameters.push({ "name": "id", "dataType": sql.Int, "value": this.id });
        }
       
        inputParameters.push({ "name": "title", "dataType": sql.NVarChar, "value": this.title });
        inputParameters.push({ "name": "content", "dataType": sql.NVarChar, "value": this.content });
        inputParameters.push({ "name": "author", "dataType": sql.NVarChar, "value": this.author });
        inputParameters.push({ "name": "lastUpdatedDate", "dataType": sql.DateTime, "value": DataFormatter.StringToDate(this.lastUpdatedDate) });
        inputParameters.push({ "name": "isPublished", "dataType": sql.Bit, "value": DataFormatter.BooleanToBit(this.isPublished) });

        return inputParameters;
    }
}
