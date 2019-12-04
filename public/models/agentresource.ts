import * as sql from '../../Application/node_modules/mssql';
import { DataFormatter } from "../providers/dataFormatter/dbFormatData";

export class AgentResource {

    public id: number;   
    public statusId: number   
    public priorityId: number;  
    public sourceId: number;    
    public displayName: string;
    public modifiedBy: string;
    public createdBy: string;
    public publishDate: string;
    public description: string;
    public link: string;
    public fileName: string;
    public fileLocation: string;
    public isDeleted: boolean;

    constructor() {

    }

    public static MapDBToObject(row: any): AgentResource{

        let agentResource: AgentResource = new AgentResource();

        agentResource.id = row.ResourceID;
        agentResource.statusId = row.StatusId;
        agentResource.priorityId = row.PriorityId;
        agentResource.displayName = row.DisplayName;
        agentResource.sourceId = row.SourceId;
        agentResource.modifiedBy = row.ModifiedBy;
        agentResource.createdBy = row.CreatedBy;
        agentResource.description = row.Description;
        agentResource.link = row.Link;
        agentResource.fileName = row.FileName;
        agentResource.fileLocation = row.FileLocation;
        agentResource.isDeleted = row.Deleted;             
        agentResource.publishDate = DataFormatter.DateToString(row.PublishDate);

        return agentResource;
    }

    public static MapDBToArray(results: any): AgentResource[] {

        let newFeedsArray: AgentResource[] = [];

        results.recordset.forEach(function (recordset) {
            let newFeed = AgentResource.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });       

        return newFeedsArray;
    }

    public static MapObjectToArray(results: any): AgentResource[] {

        let newFeedsArray: AgentResource[] = [];

        results.forEach(function (recordset) {
            let newFeed = AgentResource.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });

        return newFeedsArray;
    }

    public GetDBParameters(): any[] {

        let inputParameters = [];

        if (this.id > 0) {
            inputParameters.push({ "name": "id", "dataType": sql.Int, "value": this.id });
        }

        inputParameters.push({ "name": "statusId", "dataType": sql.Int, "value": this.statusId });
        inputParameters.push({ "name": "priorityId", "dataType": sql.Int, "value": this.priorityId });
        inputParameters.push({ "name": "sourceId", "dataType": sql.Int, "value": this.sourceId });
        inputParameters.push({ "name": "displayName", "dataType": sql.NVarChar, "value": this.displayName });
        inputParameters.push({ "name": "modifiedBy", "dataType": sql.NVarChar, "value": this.modifiedBy });
        inputParameters.push({ "name": "createdBy", "dataType": sql.NVarChar, "value": this.createdBy });
        inputParameters.push({ "name": "description", "dataType": sql.NVarChar, "value": this.description });
        inputParameters.push({ "name": "link", "dataType": sql.NVarChar, "value": this.link });
        inputParameters.push({ "name": "fileName", "dataType": sql.NVarChar, "value": this.fileName });
        inputParameters.push({ "name": "fileLocation", "dataType": sql.NVarChar, "value": this.fileLocation });
        inputParameters.push({ "name": "publishDate", "dataType": sql.DateTime, "value": DataFormatter.StringToDate(this.publishDate) });
        inputParameters.push({ "name": "isDeleted", "dataType": sql.Bit, "value": DataFormatter.BooleanToBit(this.isDeleted) });

        return inputParameters;
    }
}
