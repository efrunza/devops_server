import { AgentResource } from "public/models/agentresource";
import { AgentRequestForMaterial } from "public/models/agentrequestformaterial";

export interface IAgentResourceRepository{

    getAllAgentResources():Promise<AgentResource[]>;
    getAgentResourceById(id:Number):Promise<AgentResource>;
    getCountriesAndProvinces():Promise<any>;
    saveAgentResource(agentResource:AgentResource):Promise<AgentResource>;
    saveAgentRequestForMaterial(agentRequestForMaterial:AgentRequestForMaterial):Promise<AgentRequestForMaterial>;
    deleteAgentResource(id:Number):Promise<boolean>;     

}