export interface IAgentResource{

    getAllAgentResources(req:any, res:any,next:any):void;
    getAgentResourceById(req:any, res:any,next:any):void;
    getCountriesAndProvinces(req:any, res:any, next:any):void;
    saveAgentResource(req:any, res:any,next:any):void;
    saveAgentRequestForMaterial(req:any, res:any,next:any):void;
    deleteAgentResource(req:any, res:any,next:any):void;   
}

