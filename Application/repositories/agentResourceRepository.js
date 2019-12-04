"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const agentresource_1 = require("../models/agentresource");
const sqlDBPovider_1 = require("../providers/dbProvider/sqlDBPovider");
const agentrequestformaterial_1 = require("../models/agentrequestformaterial");
class AgentResourceRepository {
    constructor() { }
    ;
    async getAllAgentResources() {
        let agentResourceArray = [];
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = [];
        await provider.executeSPWithParameters('sp_GetAllAgentResources', inputParameters).then(results => {
            if (results) {
                agentResourceArray = agentresource_1.AgentResource.MapDBToArray(results);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return agentResourceArray;
    }
    async getAgentResourceById(id) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let agentResource = new agentresource_1.AgentResource();
        let inputParameters = [{ name: "id", dataType: sql.Int, value: id }];
        await provider.executeSPWithParameters('dbo.sp_GetAgentResourceById', inputParameters).then(results => {
            if (results) {
                agentResource = agentresource_1.AgentResource.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return agentResource;
    }
    async getCountriesAndProvinces() {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let jsonResult;
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
    async deleteAgentResource(agenResourceId) {
        let returnValue = true;
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = [{ name: "id", dataType: sql.Int, value: agenResourceId }];
        await provider.executeSPWithParameters('sp_DeleteAgentResource', inputParameters)
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return returnValue;
    }
    async saveAgentResource(input) {
        let dbAgentResource = new agentresource_1.AgentResource();
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
    async saveAgentRequestForMaterial(input) {
        let dbAgentRequestForMaterial = new agentrequestformaterial_1.AgentRequestForMaterial();
        await this.insertAgentRequestForMaterial(input).then(result => {
            dbAgentRequestForMaterial = result;
        });
        return dbAgentRequestForMaterial;
    }
    async insertAgentRequestForMaterial(input) {
        let dbAgentRequestForMaterial = new agentrequestformaterial_1.AgentRequestForMaterial();
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = input.GetDBParameters();
        await provider.executeSPWithParameters('IAP.sp_InsertAgentRequestForMaterial', inputParameters).then(results => {
            if (results) {
                dbAgentRequestForMaterial = agentrequestformaterial_1.AgentRequestForMaterial.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return dbAgentRequestForMaterial;
    }
    async insertAgentResource(input) {
        let dbAgentResource = new agentresource_1.AgentResource();
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = input.GetDBParameters();
        await provider.executeSPWithParameters('sp_InsertAgentResource', inputParameters).then(results => {
            if (results) {
                dbAgentResource = agentresource_1.AgentResource.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return dbAgentResource;
    }
    async updateAgentResource(input) {
        let dbAgentResource = new agentresource_1.AgentResource();
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let inputParameters = input.GetDBParameters();
        await provider.executeSPWithParameters('sp_UpdateAgentResource', inputParameters).then(results => {
            if (results) {
                dbAgentResource = agentresource_1.AgentResource.MapDBToObject(results.recordset[0]);
            }
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return dbAgentResource;
    }
    logErrorsCommon(err, provider) {
        // log errors into database
        provider.executeSPWithParameters('sp_LogErrors', [
            { name: "errorMessage", dataType: sql.NVarChar, value: err },
            { name: "errorStack", dataType: sql.NVarChar, value: err.stack.split("\n") }
        ]);
        return new Promise((resolve, reject) => {
            reject("The server encounters an error.");
        });
    }
}
exports.AgentResourceRepository = AgentResourceRepository;
//# sourceMappingURL=agentResourceRepository.js.map