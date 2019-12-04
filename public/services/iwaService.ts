
import { IWARepository } from "../repositories/iwaRepository";

export class IWAService {

    private repo: IWARepository;   
      
    constructor() {
        this.repo = new IWARepository();                    
    }    
    
   async getApplicationInfo(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getApplicationInfo()
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async getProvincesStates(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getProvincesStates()
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async getLanguageCodes(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getLanguageCodes()
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async getApplicantBioData(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getApplicantBioData()
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async getAvailablePrograms(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getAvailablePrograms(req)
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async getApplicationInfoAgent(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.getApplicationInfoAgent()
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }

   async storeApplicantBioData(req:any, res:any, next:any):Promise<any>
   {
       let recordset: any;
       await this.repo.storeApplicantBioData(req)
       .then
       (
            results  => recordset = results
       )
       .catch(err => { next(err); })     
       
       return recordset;
   }


}
