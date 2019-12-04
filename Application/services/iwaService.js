"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iwaRepository_1 = require("../repositories/iwaRepository");
class IWAService {
    constructor() {
        this.repo = new iwaRepository_1.IWARepository();
    }
    async getApplicationInfo(req, res, next) {
        let recordset;
        await this.repo.getApplicationInfo()
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
    async getProvincesStates(req, res, next) {
        let recordset;
        await this.repo.getProvincesStates()
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
    async getLanguageCodes(req, res, next) {
        let recordset;
        await this.repo.getLanguageCodes()
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
    async getApplicantBioData(req, res, next) {
        let recordset;
        await this.repo.getApplicantBioData()
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
    async getAvailablePrograms(req, res, next) {
        let recordset;
        await this.repo.getAvailablePrograms(req)
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
    async getApplicationInfoAgent(req, res, next) {
        let recordset;
        await this.repo.getApplicationInfoAgent()
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
    async storeApplicantBioData(req, res, next) {
        let recordset;
        await this.repo.storeApplicantBioData(req)
            .then(results => recordset = results)
            .catch(err => { next(err); });
        return recordset;
    }
}
exports.IWAService = IWAService;
//# sourceMappingURL=iwaService.js.map