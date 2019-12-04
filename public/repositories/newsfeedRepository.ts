import * as sql from '../../Application/node_modules/mssql';
import { NewsFeed } from "../models/newsfeed";
import { SQLDBProvider } from "../providers/dbProvider/sqlDBPovider";
import { DataFormatter } from "../providers/dataFormatter/dbFormatData";
import { INewsFeedRepository } from '../interfaces/iNewsFeedRepository';

// The repository class implements the calls to the database.
// The repository class's responsabilities are the following:

//  -   make use of the SQLDBProvider class to call into the database.
//  -   execute calls to the database via methods that uses stored procedures or
//  -   via methods that uses inline queries.

//  The repository class methods catch the database errors and logged the errors into the database (table dbo.Errors)

export class NewsFeedRepository implements INewsFeedRepository
{    
    constructor() {};

    //stored procedures
    public async getAllNewsFeeds(): Promise<NewsFeed[]>{

        //throw new Error('BROKEN SERVER 2.');

        let newFeedsArray: NewsFeed[] = [];
        let provider = new SQLDBProvider();
        let inputParameters:any[] = [];

        await provider.executeSPWithParameters('sp_GetAllNewsFeeds', inputParameters).then(results => {

            if (results) {

                newFeedsArray = NewsFeed.MapDBToArray(results);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);           
        });      

        return newFeedsArray;
    }

    public async getNewsFeedById(id: number):Promise<NewsFeed> {

        let provider = new SQLDBProvider();
        let newFeed: NewsFeed = new NewsFeed();

        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];

        await provider.executeSPWithParameters('dbo.sp_GetNewsFeedById', inputParameters).then(results => {
            if (results) {               
                newFeed = NewsFeed.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {
            
            return this.logErrorsCommon(err, provider);
        });      

        return newFeed;    
    }

    public async deleteNewsFeed(newsFeedId: number): Promise<boolean> {

        let returnValue: boolean = true;

        let provider = new SQLDBProvider();

        let inputParameters = [{ name: "id", dataType: sql.Int, value: newsFeedId }];

        await provider.executeSPWithParameters('sp_DeleteNewsFeed', inputParameters)
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });
             
        return returnValue;
    }

    public async saveNewsFeed(newsFeed:NewsFeed): Promise<NewsFeed> {

        let dbNewsFeed: NewsFeed = new NewsFeed();

        if (newsFeed.id > 0) {

            await this.updateNewsFeed(newsFeed).then(result => {
                dbNewsFeed = result;
            });
        }
        else {
            await this.insertNewsFeed(newsFeed).then(result => {
                dbNewsFeed = result;
            });
        }        

        return dbNewsFeed;
    }

    public async saveNewsFeedList(newsFeedArrayXML: string): Promise<boolean> {

        let returnValue: boolean = true;

        let provider = new SQLDBProvider();

        let inputParameters = [{ name: "input", dataType: sql.Xml, value: newsFeedArrayXML }];
        let outputParameters = [{ name: "outputValue", dataType: sql.VarChar, value: "" }];

        provider.executeSPWithParametersAndOutputParameter(
            'dbo.sp_SaveNewsFeedList',
            inputParameters,
            outputParameters
        )
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return returnValue;
    }

    private async insertNewsFeed(newsFeed: NewsFeed): Promise<NewsFeed> {

        let dbNewsFeed: NewsFeed = new NewsFeed();
        let provider = new SQLDBProvider();

        let inputParameters = newsFeed.GetDBParameters();

        await provider.executeSPWithParameters('sp_InsertNewsFeed', inputParameters).then(results => {

            if (results) {
                dbNewsFeed = NewsFeed.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return dbNewsFeed;
    }

    private async updateNewsFeed(newsFeed: NewsFeed): Promise<NewsFeed> {

        let dbNewsFeed: NewsFeed = new NewsFeed();
        let provider = new SQLDBProvider();

        let inputParameters = newsFeed.GetDBParameters();

        await provider.executeSPWithParameters('sp_UpdateNewsFeed', inputParameters).then(results => {

            if (results) {
                dbNewsFeed = NewsFeed.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return dbNewsFeed;
    }

    // queries
    public async getAllNewsFeedQuery(): Promise<any> {

        let provider = new SQLDBProvider();
        let recordset: any = null;

        let inputParameters = [];

        await provider.executeQuery('select id, title, content, author, lastUpdatedDate, isPublished from dbo.NewsFeed', inputParameters).then(results => {
            if (results) {
                recordset = results.recordset;
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return recordset;
    }

    public async getNewsFeedQueryById(id: number): Promise<any> {

        let provider = new SQLDBProvider();
        let recordset: any = null;

        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];

        await provider.executeQuery('select id, title, content, author, lastUpdatedDate, isPublished from dbo.NewsFeed where id =@id', inputParameters).then(results => {
            if (results) {
                recordset = results.recordset[0];
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return recordset;
    }

    public async saveNewsFeedQuery(newsFeed: any): Promise<any> {

        let provider = new SQLDBProvider();
        let rowsAffected: any = null;
        let statement: string = "";
        let inputParameters: any[] = [];

        if (newsFeed.id > 0) {

            statement = 'update dbo.NewsFeed set title=@title, content=@content, author=@author, lastUpdatedDate = @lastUpdatedDate, isPublished = @isPublished where id = @id';            
            inputParameters.push({ "name": "id", "dataType": sql.Int, "value": newsFeed.id });                
        }
        else {

            statement = 'insert into dbo.NewsFeed values(@title, @content, @author, @lastUpdatedDate, @isPublished)';
        }

        inputParameters.push({ "name": "title", "dataType": sql.NVarChar, "value": newsFeed.title });
        inputParameters.push({ "name": "content", "dataType": sql.NVarChar, "value": newsFeed.content });
        inputParameters.push({ "name": "author", "dataType": sql.NVarChar, "value": newsFeed.author });
        inputParameters.push({ "name": "lastUpdatedDate", "dataType": sql.DateTime, "value": DataFormatter.StringToDate(newsFeed.lastUpdatedDate) });
        inputParameters.push({ "name": "isPublished", "dataType": sql.Bit, "value": DataFormatter.BooleanToBit(newsFeed.isPublished) });

        await provider.executeQuery(statement, inputParameters).then(result => {
            rowsAffected = result.rowsAffected[0];
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);

        });
       
        return rowsAffected;
    }

    public async deleteNewsFeedQuery(id: number): Promise<any> {

        let provider = new SQLDBProvider();
        let rowsAffected: any = null;

        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];

        await provider.executeQuery('delete from dbo.NewsFeed where id = @id', inputParameters).then(results => {
            if (results) {
                rowsAffected = results.rowsAffected;
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return rowsAffected;
    }
        

    private logErrorsCommon(err: any, provider:SQLDBProvider):Promise<any> {

        // log errors into database
        provider.executeSPWithParameters('sp_LogErrors',
            [
                { name: "errorMessage", dataType: sql.NVarChar, value: err },
                { name: "errorStack", dataType: sql.NVarChar, value: err.stack.split("\n") }
            ]);

        return new Promise<any>((resolve, reject) => {
            reject("The server encounters an error.");
        });
    }
}

