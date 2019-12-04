"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agentResourceService_1 = require("../../../services/agentResourceService");
class AgentResourceController {
    constructor(router) {
        this.service = new agentResourceService_1.AgentResourceService();
        router.get('/getAllAgentResources', this.getAllAgentResources.bind(this));
        router.get('/getCountriesAndProvinces', this.getCountriesAndProvinces.bind(this));
        router.get('/:id', this.getAgentResourceById.bind(this));
        router.post('/saveAgentResource', this.saveAgentResource.bind(this));
        router.post('/saveAgentRequestForMaterial', this.saveAgentRequestForMaterial.bind(this));
        router.post('/deleteAgentResource', this.deleteAgentResource.bind(this));
    }
    getAllAgentResources(req, res, next) {
        this.service.getAllAgentResources(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getAgentResourceById(req, res, next) {
        this.service.getAgentResourceById(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    getCountriesAndProvinces(req, res, next) {
        this.service.getCountriesAndProvinces(req, res, next).then(results => {
            let localResults = { countriesList: JSON.parse(results.countriesList) };
            return res.send(localResults);
        }).
            catch(err => { next(err); });
    }
    saveAgentResource(req, res, next) {
        this.service.saveAgentResource(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    saveAgentRequestForMaterial(req, res, next) {
        this.service.saveAgentRequestForMaterial(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
    deleteAgentResource(req, res, next) {
        this.service.deleteAgentResource(req, res, next).then(results => res.json(results)).
            catch(err => { next(err); });
    }
}
module.exports = AgentResourceController;
//# sourceMappingURL=agent-resources.controller.js.map