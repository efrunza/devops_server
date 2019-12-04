"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iwaService_1 = require("../../../services/iwaService");
class IWAController {
    constructor(router) {
        this.service = new iwaService_1.IWAService();
        router.get('/getApplicationInfo', this.getApplicationInfo.bind(this));
        router.get('/getProvincesStates', this.getProvincesStates.bind(this));
        router.get('/getLanguageCodes', this.getLanguageCodes.bind(this));
        router.get('/getApplicantBioData', this.getApplicantBioData.bind(this));
        router.post('/getAvailablePrograms', this.getAvailablePrograms.bind(this));
        router.post('/getApplicationInfoAgent', this.getApplicationInfoAgent.bind(this));
        router.post('/storeApplicantBioData', this.storeApplicantBioData.bind(this));
    }
    getApplicationInfo(req, res, next) {
        this.service.getApplicationInfo(req, res, next).then(results => {
            return res.json(results);
        }).
            catch(err => { next(err); });
    }
    getProvincesStates(req, res, next) {
        this.service.getProvincesStates(req, res, next).then(results => { return res.json(JSON.parse(results)); }).
            catch(err => { next(err); });
    }
    getLanguageCodes(req, res, next) {
        this.service.getLanguageCodes(req, res, next).then(results => { return res.json(JSON.parse(results)); }).
            catch(err => { next(err); });
    }
    getApplicantBioData(req, res, next) {
        this.service.getApplicantBioData(req, res, next).then(results => {
            return res.json(results);
        }).
            catch(err => { next(err); });
    }
    getAvailablePrograms(req, res, next) {
        this.service.getAvailablePrograms(req, res, next).then(results => {
            return res.json(results);
        }).
            catch(err => { next(err); });
    }
    getApplicationInfoAgent(req, res, next) {
        this.service.getApplicationInfoAgent(req, res, next).then(results => { return res.json(results); }).
            catch(err => { next(err); });
    }
    storeApplicantBioData(req, res, next) {
        this.service.storeApplicantBioData(req, res, next).then(results => { return res.json(results); }).
            catch(err => { next(err); });
    }
}
module.exports = IWAController;
//# sourceMappingURL=iwa.controller.js.map