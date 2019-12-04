import * as sql from '../../Application/node_modules/mssql';
import { DataFormatter } from "../providers/dataFormatter/dbFormatData";
import { runInThisContext } from 'vm';

export class AgentRequestForMaterial {

    public id: number;   
    public programList: string;
	public englishLanguageInstitute: string;
	public firstName: string;
	public lastName: string;
	public emailAddress:string;
	public addressLine1: string;
	public addressLine2: string;
	public country: string;
	public province: string;
	public city: string;
	public requestedBy: string;
    public requestedDate: string;
    public postalCode: string;

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

    public static MapDBToObject(row: any): AgentRequestForMaterial{

        let localObject: AgentRequestForMaterial = new AgentRequestForMaterial();

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

    public static MapDBToArray(results: any): AgentRequestForMaterial[] {

        let agentRequestForMaterialArray: AgentRequestForMaterial[] = [];

        results.recordset.forEach(function (recordset) {
            let agentRequestForMaterial = AgentRequestForMaterial.MapDBToObject(recordset);
            agentRequestForMaterialArray.push(agentRequestForMaterial);
        });       

        return agentRequestForMaterialArray;
    }

    public static MapObjectToArray(results: any): AgentRequestForMaterial[] {

        let agentRequestForMaterialArray: AgentRequestForMaterial[] = [];

        results.forEach(function (recordset) {
            let newFeed = AgentRequestForMaterial.MapDBToObject(recordset);
            agentRequestForMaterialArray.push(newFeed);
        });

        return agentRequestForMaterialArray;
    }

    public GetDBParameters(): any[] {

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
