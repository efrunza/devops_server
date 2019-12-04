import { IAgentResource} from "../../../interfaces/iAgentResourceController";
import { IAgentResourceService } from "../../../interfaces/iAgentResourceService";
import { AgentResourceService } from "../../../services/agentResourceService";

class AgentResourceController implements IAgentResource {

    private service: IAgentResourceService;   
      
    constructor(router) {
        
        this.service = new AgentResourceService();      
                          
        router.get('/getAllAgentResources', this.getAllAgentResources.bind(this));
        router.get('/getCountriesAndProvinces', this.getCountriesAndProvinces.bind(this));
        router.get('/:id', this.getAgentResourceById.bind(this));
        router.post('/saveAgentResource', this.saveAgentResource.bind(this));  
        router.post('/saveAgentRequestForMaterial', this.saveAgentRequestForMaterial.bind(this));  
        router.post('/deleteAgentResource', this.deleteAgentResource.bind(this));       
    }    

    getAllAgentResources(req:any, res:any, next:any):void
    {
        this.service.getAllAgentResources(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })                
    }

    getAgentResourceById(req:any, res:any, next:any):void
    {
        this.service.getAgentResourceById(req,res,next).then(
            results => res.json(results)
        ).
        catch (err => { next(err); })    
    }

    getCountriesAndProvinces(req:any, res:any, next:any):void
    {
        this.service.getCountriesAndProvinces(req,res,next).then(
            results => {

                let localResults = {countriesList: JSON.parse(results.countriesList)}

                return res.send(localResults);
            }
        ).
        catch(err => { next(err); })                
    }
    saveAgentResource(req:any, res:any, next:any):void
    {
        this.service.saveAgentResource(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })    
    }

    saveAgentRequestForMaterial(req:any, res:any, next:any):void
    {
        this.service.saveAgentRequestForMaterial(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })    
    }

    deleteAgentResource(req:any, res:any, next:any):void
    {
        this.service.deleteAgentResource(req,res,next).then(
            results => res.json(results)
        ).
        catch(err => { next(err); })    
    }

}

module.exports = AgentResourceController