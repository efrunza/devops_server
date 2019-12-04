import { ServerConstants } from "../common/envConstants";
import { IAgentResourceService } from "../interfaces/iAgentResourceService";
import { IAgentResourceRepository } from "../interfaces/iAgentResourceRepository";
import { AgentResourceRepository } from "../repositories/agentResourceRepository";

import { AgentResource } from "../models/agentresource";
import { AutoMap } from "../common/autoMap";
import { AgentRequestForMaterial } from "../models/agentrequestformaterial";

export class AgentResourceService implements IAgentResourceService {

    private repo: IAgentResourceRepository;   
      
    constructor() 
    {
        this.repo = new AgentResourceRepository();                 
    }    
    
    async getAllAgentResources(req:any, res:any, next:any):Promise<AgentResource[]>
    {
        let agentResources:AgentResource[] = [];

        await this.repo.getAllAgentResources()
        .then
        (
            results => agentResources = results
        )
        .catch(err => { next(err); })     
        
        return agentResources;
    }

   async getAgentResourceById(req:any, res:any, next:any):Promise<AgentResource>
   {

       let id = req.params.id;
       let agentResource = new AgentResource();

       await this.repo.getAgentResourceById(id)
       .then
       (
           result => {agentResource = result}
       )
       .catch(err => { next(err); })    
       
       return agentResource;
   }

   async getCountriesAndProvinces(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getCountriesAndProvinces()
       .then
       (
            results  => 
            {
                recordset = results;
            }
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async saveAgentResource(req:any, res:any, next:any):Promise<AgentResource>
   {
       let agentResource: AgentResource = new AgentResource();

       AutoMap.Map(agentResource,req.body.agentResource);

       await this.repo.saveAgentResource(agentResource).then
       (
           result => {agentResource = result}
       )
       .catch(err => { next(err); })  
       
       return agentResource;
   }

   async saveAgentRequestForMaterial(req:any, res:any, next:any):Promise<AgentRequestForMaterial>
   {
       let agentRequestForMaterial: AgentRequestForMaterial = new AgentRequestForMaterial();

       req.body.id = 0;
       
       AutoMap.Map(agentRequestForMaterial,req.body);

       await this.repo.saveAgentRequestForMaterial(agentRequestForMaterial).then
       (
           result => {agentRequestForMaterial = result}
       )
       .catch(err => { next(err); })  
       
       return agentRequestForMaterial;
   }

   async deleteAgentResource(req:any, res:any, next:any):Promise<boolean>
   {
       let agentResource = req.body.agentResource.id;
       let bIsSuccess = false;

       await this.repo.deleteAgentResource(agentResource).then
       (
           result => {bIsSuccess = true}
       )
       .catch(err => { next(err); })

       return bIsSuccess;
   }

}
