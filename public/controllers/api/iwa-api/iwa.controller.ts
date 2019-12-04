import { IWAService } from "../../../services/iwaService";

class IWAController {

    private service: IWAService;   
      
    constructor(router) {
        
        this.service = new IWAService();      
                          
        router.get('/getApplicationInfo', this.getApplicationInfo.bind(this));
        router.get('/getProvincesStates', this.getProvincesStates.bind(this));
        router.get('/getLanguageCodes', this.getLanguageCodes.bind(this)); 
        router.get('/getApplicantBioData', this.getApplicantBioData.bind(this));   
        router.post('/getAvailablePrograms', this.getAvailablePrograms.bind(this));       
        router.post('/getApplicationInfoAgent', this.getApplicationInfoAgent.bind(this));      
        router.post('/storeApplicantBioData', this.storeApplicantBioData.bind(this));       
    }    

    getApplicationInfo(req:any, res:any, next:any):void
    {
        this.service.getApplicationInfo(req,res,next).then(
            results => {
                return res.json(results)}
        ).
        catch(err => { next(err); })                
    }

    getProvincesStates(req:any, res:any, next:any):void
    {
        this.service.getProvincesStates(req,res,next).then(
            results => {return res.json(JSON.parse(results))}
        ).
        catch(err => { next(err); })                
    }

    getLanguageCodes(req:any, res:any, next:any):void
    {
        this.service.getLanguageCodes(req,res,next).then(
            results => {return res.json(JSON.parse(results))}
        ).
        catch(err => { next(err); })                
    }

    getApplicantBioData(req:any, res:any, next:any):void
    {
        this.service.getApplicantBioData(req,res,next).then(
            results => {
                return res.json(results)}
        ).
        catch(err => { next(err); })                
    }

    getAvailablePrograms(req:any, res:any, next:any):void
    {
        this.service.getAvailablePrograms(req,res,next).then(
            results => {
                return res.json(results)}
        ).
        catch(err => { next(err); })                
    }

    getApplicationInfoAgent(req:any, res:any, next:any):void
    {
        this.service.getApplicationInfoAgent(req,res,next).then(
            results => {return res.json(results)}
        ).
        catch(err => { next(err); })                
    }    

    storeApplicantBioData(req:any, res:any, next:any):void
    {
        this.service.storeApplicantBioData(req,res,next).then(
            results => {return res.json(results)}
        ).
        catch(err => { next(err); })                
    }    

}

module.exports = IWAController