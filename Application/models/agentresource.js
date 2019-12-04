"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("../../node_modules/mssql");
const dbFormatData_1 = require("../providers/dataFormatter/dbFormatData");
class AgentResource {
    constructor() {
    }
    static MapDBToObject(row) {
        let agentResource = new AgentResource();
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
        agentResource.publishDate = dbFormatData_1.DataFormatter.DateToString(row.PublishDate);
        return agentResource;
    }
    static MapDBToArray(results) {
        let newFeedsArray = [];
        results.recordset.forEach(function (recordset) {
            let newFeed = AgentResource.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });
        return newFeedsArray;
    }
    static MapObjectToArray(results) {
        let newFeedsArray = [];
        results.forEach(function (recordset) {
            let newFeed = AgentResource.MapDBToObject(recordset);
            newFeedsArray.push(newFeed);
        });
        return newFeedsArray;
    }
    GetDBParameters() {
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
        inputParameters.push({ "name": "publishDate", "dataType": sql.DateTime, "value": dbFormatData_1.DataFormatter.StringToDate(this.publishDate) });
        inputParameters.push({ "name": "isDeleted", "dataType": sql.Bit, "value": dbFormatData_1.DataFormatter.BooleanToBit(this.isDeleted) });
        return inputParameters;
    }
}
exports.AgentResource = AgentResource;
//# sourceMappingURL=agentresource.js.map