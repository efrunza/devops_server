import * as sql from '../../Application/node_modules/mssql';
import { AgentResource } from "../models/agentresource";
import { SQLDBProvider } from "../providers/dbProvider/sqlDBPovider";
import { IAgentResourceRepository } from '../interfaces/iAgentResourceRepository';
import { AgentRequestForMaterial } from '../models/agentrequestformaterial';

export class AgentResourceRepository implements IAgentResourceRepository
{    
    constructor() {};

    public async getAllAgentResources(): Promise<AgentResource[]>{

        let agentResourceArray: AgentResource[] = [];
        let provider = new SQLDBProvider();
        let inputParameters:any[] = [];

        await provider.executeSPWithParameters('sp_GetAllAgentResources', inputParameters).then(results => {

            if (results) {

                agentResourceArray = AgentResource.MapDBToArray(results);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);           
        });      

        return agentResourceArray;
    }

    public async getAgentResourceById(id: number):Promise<AgentResource> {

        let provider = new SQLDBProvider();
        let agentResource: AgentResource = new AgentResource();

        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];

        await provider.executeSPWithParameters('dbo.sp_GetAgentResourceById', inputParameters).then(results => {
            if (results) {               
                agentResource = AgentResource.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {
            
            return this.logErrorsCommon(err, provider);
        });      

        return agentResource;    
    }

    public async getCountriesAndProvinces():Promise<any> {

        let provider = new SQLDBProvider();
        let jsonResult: string;
        let inputParameters = [];

        await provider.executeSPWithParameters('IAP.GetCountriesAndProvinces', inputParameters).then(results => {
            if (results) {               
                jsonResult = results.recordset[0];
            }
        })
        .catch(err => {
            
            return this.logErrorsCommon(err, provider);
        });      

        return jsonResult;    
    }

    public async deleteAgentResource(agenResourceId: number): Promise<boolean> {

        let returnValue: boolean = true;

        let provider = new SQLDBProvider();

        let inputParameters = [{ name: "id", dataType: sql.Int, value: agenResourceId }];

        await provider.executeSPWithParameters('sp_DeleteAgentResource', inputParameters)
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });
             
        return returnValue;
    }

    public async saveAgentResource(input:AgentResource): Promise<AgentResource> {

        let dbAgentResource: AgentResource = new AgentResource();

        if (dbAgentResource.id > 0) {

            await this.updateAgentResource(input).then(result => {
                dbAgentResource = result;
            });
        }
        else {
            await this.insertAgentResource(input).then(result => {
                dbAgentResource = result;
            });
        }        

        return dbAgentResource;
    }

    public async saveAgentRequestForMaterial(input:AgentRequestForMaterial):Promise<AgentRequestForMaterial>
    {
        let dbAgentRequestForMaterial: AgentRequestForMaterial = new AgentRequestForMaterial();

        await this.insertAgentRequestForMaterial(input).then(result => {
            dbAgentRequestForMaterial = result;
        });

        return dbAgentRequestForMaterial;
    }

    private async insertAgentRequestForMaterial(input: AgentRequestForMaterial): Promise<AgentRequestForMaterial> {

        let dbAgentRequestForMaterial: AgentRequestForMaterial = new AgentRequestForMaterial();
        let provider = new SQLDBProvider();

        let inputParameters = input.GetDBParameters();

        await provider.executeSPWithParameters('IAP.sp_InsertAgentRequestForMaterial', inputParameters).then(results => {

            if (results) {
                dbAgentRequestForMaterial = AgentRequestForMaterial.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return dbAgentRequestForMaterial;
    }


    private async insertAgentResource(input: AgentResource): Promise<AgentResource> {

        let dbAgentResource: AgentResource = new AgentResource();
        let provider = new SQLDBProvider();

        let inputParameters = input.GetDBParameters();

        await provider.executeSPWithParameters('sp_InsertAgentResource', inputParameters).then(results => {

            if (results) {
                dbAgentResource = AgentResource.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return dbAgentResource;
    }

    private async updateAgentResource(input: AgentResource): Promise<AgentResource> {

        let dbAgentResource: AgentResource = new AgentResource();
        let provider = new SQLDBProvider();

        let inputParameters = input.GetDBParameters();

        await provider.executeSPWithParameters('sp_UpdateAgentResource', inputParameters).then(results => {

            if (results) {
                dbAgentResource = AgentResource.MapDBToObject(results.recordset[0]);
            }
        })
        .catch(err => {

            return this.logErrorsCommon(err, provider);
        });

        return dbAgentResource;
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

