"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agentResourceRepository_1 = require("../repositories/agentResourceRepository");
const agentresource_1 = require("../models/agentresource");
const autoMap_1 = require("../common/autoMap");
const agentrequestformaterial_1 = require("../models/agentrequestformaterial");
class AgentResourceService {
    constructor() {
        this.repo = new agentResourceRepository_1.AgentResourceRepository();
    }
    async getAllAgentResources(req, res, next) {
        let agentResources = [];
        await this.repo.getAllAgentResources()
            .then(results => agentResources = results)
            .catch(err => { next(err); });
        return agentResources;
    }
    async getAgentResourceById(req, res, next) {
        let id = req.params.id;
        let agentResource = new agentresource_1.AgentResource();
        await this.repo.getAgentResourceById(id)
            .then(result => { agentResource = result; })
            .catch(err => { next(err); });
        return agentResource;
    }
    async getCountriesAndProvinces(req, res, next) {
        let recordset;
        await this.repo.getCountriesAndProvinces()
            .then(results => {
            recordset = results;
        })
            .catch(err => { next(err); });
        return recordset;
    }
    async saveAgentResource(req, res, next) {
        let agentResource = new agentresource_1.AgentResource();
        autoMap_1.AutoMap.Map(agentResource, req.body.agentResource);
        await this.repo.saveAgentResource(agentResource).then(result => { agentResource = result; })
            .catch(err => { next(err); });
        return agentResource;
    }
    async saveAgentRequestForMaterial(req, res, next) {
        let agentRequestForMaterial = new agentrequestformaterial_1.AgentRequestForMaterial();
        req.body.id = 0;
        autoMap_1.AutoMap.Map(agentRequestForMaterial, req.body);
        await this.repo.saveAgentRequestForMaterial(agentRequestForMaterial).then(result => { agentRequestForMaterial = result; })
            .catch(err => { next(err); });
        return agentRequestForMaterial;
    }
    async deleteAgentResource(req, res, next) {
        let agentResource = req.body.agentResource.id;
        let bIsSuccess = false;
        await this.repo.deleteAgentResource(agentResource).then(result => { bIsSuccess = true; })
            .catch(err => { next(err); });
        return bIsSuccess;
    }
}
exports.AgentResourceService = AgentResourceService;
//# sourceMappingURL=agentResourceService.js.map