"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const sqlDBPovider_1 = require("../providers/dbProvider/sqlDBPovider");
class IWARepository {
    constructor() { }
    ;
    async getApplicationInfo() {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = [{ name: "appId", dataType: sql.NVarChar, value: '56000010000' }];
        await provider.executeSPWithParameters('sp_GetApplicationInfo', inputParameters).then(results => {
            recordset = results.recordset[0];
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    async getProvincesStates() {
        var newCountrieList = '{ "countriesList": [{"code":"CA", "name":"Canada","provinceList":[{"code":"ON", "name":"Ontario"}, {"code":"AB", "name":"Alberta"}]}]}';
        return newCountrieList;
    }
    async getLanguageCodes() {
        let newLanguageCodeList = '{ "QasData": [{"code":"EN", "name":"English", "desc":""}]}';
        return newLanguageCodeList;
    }
    async getApplicantBioData() {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = [{ name: "appId", dataType: sql.NVarChar, value: '56000010000' }];
        inputParameters.push({ name: "iwaId", dataType: sql.NVarChar, value: 'test' });
        await provider.executeSPWithParameters('sp_GetApplicantBioData', inputParameters).then(results => {
            recordset = this.formatResults(results);
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    async getAvailablePrograms(req) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = this.getAvailableProgramsParameters(req);
        await provider.executeSPWithParameters('sp_GetAvailablePrograms', inputParameters).then(results => {
            recordset = results.recordset;
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    async getApplicationInfoAgent() {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = [{ name: "appId", dataType: sql.NVarChar, value: '56000010000' }];
        await provider.executeSPWithParameters('sp_GetApplicationInfoAgent', inputParameters).then(results => {
            recordset = results.recordset[0];
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    async storeApplicantBioData(req) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let recordset = null;
        let inputParameters = this.getStoreApplicantBioDataParameters(req);
        await provider.executeSPWithParameters('sp_StoreApplicantBioData', inputParameters).then(results => {
            recordset = results;
        })
            .catch(err => {
            return this.logErrorsCommon(err, provider);
        });
        return recordset;
    }
    logErrorsCommon(err, provider) {
        // log errors into database
        provider.executeSPWithParameters('sp_LogErrors', [
            { name: "errorMessage", dataType: sql.NVarChar, value: err },
            { name: "errorStack", dataType: sql.NVarChar, value: err.stack.split("\n") }
        ]);
        return new Promise((resolve, reject) => {
            reject("The server encounters an error.");
        });
    }
    getAvailableProgramsParameters(req) {
        // read headers
        let countryCode = req.body.visa;
        let year = req.body.year.toString();
        let month = req.body.month.toString();
        let strm = '';
        // convert year(2019) month(1, 5, 9) to PeopleSoft terms 2191, 2194, 2197
        let y = year.substring(0, 1);
        if (year.substring(1, 2) === '0') {
            y = y + year.substring(2, 4);
        }
        else {
            y = y + year.substring(1, 4);
        }
        if (month === '1') {
            strm = y + '1';
        }
        else if (month === '5') {
            strm = y + 4;
        }
        else if (month === '9') {
            strm = y + '7';
        }
        let inputParameters = [
            { name: 'code', dataType: sql.NVarChar, value: countryCode },
            { name: 'strm', dataType: sql.NVarChar, value: strm }
        ];
        return inputParameters;
    }
    getStoreApplicantBioDataParameters(req) {
        let inputParameters = [
            { name: "appId", dataType: sql.NVarChar, value: '56000010000' },
            { name: "iwaId", dataType: sql.NVarChar, value: 'test' },
            { name: 'Title', dataType: sql.NVarChar, value: req.body.title },
            { name: 'Last_Name', dataType: sql.NVarChar, value: req.body.surName },
            { name: 'First_Name', dataType: sql.NVarChar, value: req.body.firstName == null ? '' : req.body.firstName },
            { name: 'Other_Names', dataType: sql.NVarChar, value: req.body.otherNames == null ? '' : req.body.otherNames },
            { name: 'Gender', dataType: sql.NVarChar, value: req.body.gender },
            { name: 'Birth_Country', dataType: sql.NVarChar, value: req.body.countryOB },
            { name: 'Citizenship', dataType: sql.NVarChar, value: req.body.countryOC },
            { name: 'Visa_Country', dataType: sql.NVarChar, value: req.body.countryOA },
            { name: 'Current_Address_Same_as_Permanent', dataType: sql.NVarChar, value: req.body.currAddrSameAsPerm },
            { name: 'Email', dataType: sql.NVarChar, value: req.body.email },
            { name: 'Birthdate', dataType: sql.Date, value: req.body.dob },
            { name: 'Primary_Language', dataType: sql.NVarChar, value: req.body.primaryLang }
        ];
        return inputParameters;
    }
    //helper methods - can be moved to a common file
    normalize(object) {
        Object.keys(object).forEach(key => {
            if (object[key]) {
                if (key != 'isPreviousStudent' &&
                    key != 'dob' &&
                    key != 'currAddrSameAsPerm' &&
                    !(object[key] instanceof Object)) {
                    object[key] = object[key].toString();
                }
                else if (key == 'dob') {
                    object[key] = object[key].toISOString().slice(0, 10);
                }
                else if (key == 'currAddrSameAsPerm') {
                    this.charFlagToBoolean(object[key]);
                }
                else if (object[key] instanceof Object) {
                    this.normalize(object[key]);
                }
            }
        });
        return object;
    }
    ;
    charFlagToBoolean(charFlag) {
        if (charFlag) {
            charFlag = charFlag.toString();
            return charFlag.match('Y', 'y', '1')
                ? true
                : charFlag.match('N', 'n', '0')
                    ? false
                    : null;
        }
        else
            return null;
    }
    ;
    formatResults(results) {
        let result = null;
        let formValue = null;
        if (results.recordset.length > 0) {
            result = results.recordset[results.recordset.length - 1];
            formValue = {
                isPreviousStudent: result.Seneca_ID ? true : false,
                previousStudentID: result.Seneca_ID,
                title: result.Title,
                surName: result.Last_Name,
                firstName: result.First_Name,
                otherNames: result.Other_Names,
                gender: result.Gender,
                dob: result.Birthdate,
                countryOB: result.Birth_Country,
                countryOC: result.Citizenship,
                countryOA: result.Visa_Country,
                primaryLang: result.Primary_Language,
                email: result.Email,
                permanentAddress: {
                    country: result.Home_Country,
                    stAddress: result.Home_Street_1,
                    stAddress2: result.Home_Street_2,
                    city: result.Home_City,
                    province: result.Home_Province,
                    zipCode: result.Home_Postal_Code,
                    phone: {
                        countryCode: result.Home_Phone_Country_Code,
                        number: result.Home_Phone_Number
                    },
                    cell: {
                        countryCode: result.Home_Cell_Country_Code,
                        number: result.Home_Cell_Phone_Number
                    }
                },
                currAddrSameAsPerm: result.Current_Address_Same_as_Permanent
            };
            if (result.Current_Address_Same_as_Permanent === false) {
                formValue = {
                    ...formValue,
                    mailingAddress: {
                        country: result.Mail_Country,
                        stAddress: result.Mail_Street_1,
                        stAddress2: result.Mail_Street_2,
                        city: result.Mail_City,
                        province: result.Mail_Province,
                        zipCode: result.Mail_Postal_Code
                    }
                };
            }
            else {
                formValue = {
                    ...formValue,
                    mailingAddress: {
                        country: result.Home_Country,
                        stAddress: result.Home_Street_1,
                        stAddress2: result.Home_Street_2,
                        city: result.Home_City,
                        province: result.Home_Province,
                        zipCode: result.Home_Postal_Code
                    }
                };
            }
            //return this.normalize(formValue);
            return formValue;
        }
    }
}
exports.IWARepository = IWARepository;
//# sourceMappingURL=iwaRepository.js.map