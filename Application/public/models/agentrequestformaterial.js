"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("../../Application/node_modules/mssql");
class AgentRequestForMaterial {
    constructor() {
        this.id = 0;
        this.programList = "";
        this.englishLanguageInstitute = "";
        this.firstName = "";
        this.lastName = "";
        this.emailAddress = "";
        this.addressLine1 = "";
        this.addressLine2 = "";
        this.country = "";
        this.province = "";
        this.city = "";
        this.requestedBy = "";
        this.requestedDate = "";
        this.postalCode = "";
    }
    static MapDBToObject(row) {
        let localObject = new AgentRequestForMaterial();
        localObject.id = row.RequestID;
        localObject.programList = row.ProgramList;
        localObject.englishLanguageInstitute = row.EnglishLanguageInstitute;
        localObject.firstName = row.FirstName;
        localObject.lastName = row.lastName;
        localObject.emailAddress = row.EmailAddress;
        localObject.addressLine1 = row.AddressLine1;
        localObject.addressLine2 = row.AddressLine2;
        localObject.country = row.Country;
        localObject.province = row.Province;
        localObject.city = row.City;
        //localObject.requestedBy = row.RequestedBy; 
        //localObject.requestedDate = row.RequestedDate;            
        localObject.postalCode = row.postalCode;
        return localObject;
    }
    static MapDBToArray(results) {
        let agentRequestForMaterialArray = [];
        results.recordset.forEach(function (recordset) {
            let agentRequestForMaterial = AgentRequestForMaterial.MapDBToObject(recordset);
            agentRequestForMaterialArray.push(agentRequestForMaterial);
        });
        return agentRequestForMaterialArray;
    }
    static MapObjectToArray(results) {
        let agentRequestForMaterialArray = [];
        results.forEach(function (recordset) {
            let newFeed = AgentRequestForMaterial.MapDBToObject(recordset);
            agentRequestForMaterialArray.push(newFeed);
        });
        return agentRequestForMaterialArray;
    }
    GetDBParameters() {
        let inputParameters = [];
        if (this.id > 0) {
            inputParameters.push({ "name": "id", "dataType": sql.Int, "value": this.id });
        }
        inputParameters.push({ "name": "programList", "dataType": sql.NVarChar, "value": this.programList });
        inputParameters.push({ "name": "englishLanguageInstitute", "dataType": sql.NVarChar, "value": this.englishLanguageInstitute });
        inputParameters.push({ "name": "firstName", "dataType": sql.NVarChar, "value": this.firstName });
        inputParameters.push({ "name": "lastName", "dataType": sql.NVarChar, "value": this.lastName });
        inputParameters.push({ "name": "emailAddress", "dataType": sql.NVarChar, "value": this.emailAddress });
        inputParameters.push({ "name": "addressLine1", "dataType": sql.NVarChar, "value": this.addressLine1 });
        inputParameters.push({ "name": "addressLine2", "dataType": sql.NVarChar, "value": this.addressLine2 });
        inputParameters.push({ "name": "country", "dataType": sql.NVarChar, "value": this.country });
        inputParameters.push({ "name": "province", "dataType": sql.NVarChar, "value": this.province });
        inputParameters.push({ "name": "city", "dataType": sql.NVarChar, "value": this.city });
        //inputParameters.push({ "name": "requestedBy", "dataType": sql.NVarChar, "value": this.requestedBy });
        inputParameters.push({ "name": "postalCode", "dataType": sql.NVarChar, "value": this.postalCode });
        return inputParameters;
    }
}
exports.AgentRequestForMaterial = AgentRequestForMaterial;
//# sourceMappingURL=agentrequestformaterial.js.map