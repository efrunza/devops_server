import { AgentResource } from "../models/agentresource";
import { AgentRequestForMaterial } from "../models/agentrequestformaterial";

export interface IAgentResourceService{

    getAllAgentResources(req:any, res:any,next:any):Promise<AgentResource[]>;
    getAgentResourceById(req:any, res:any,next:any):Promise<AgentResource>;
    getCountriesAndProvinces(req:any, res:any, next:any):Promise<any>;
    saveAgentResource(req:any, res:any,next:any):Promise<AgentResource>;
    saveAgentRequestForMaterial(req:any, res:any,next:any):Promise<AgentRequestForMaterial>;
    deleteAgentResource(req:any, res:any,next:any):Promise<boolean>;      
}