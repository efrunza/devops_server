"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const sqlDBPovider_1 = require("../providers/dbProvider/sqlDBPovider");
// This class static method is used to log the application's errors into the database.
class LogErrors {
    constructor() { }
    ;
    static logErrorsToDB(err) {
        let provider = new sqlDBPovider_1.SQLDBProvider();
        let errStack = "";
        if (err.stack) {
            errStack = err.stack;
        }
        provider.executeSPWithParameters('sp_LogErrors', [
            { name: "errorMessage", dataType: sql.NVarChar, value: err },
            { name: "errorStack", dataType: sql.NVarChar, value: errStack }
        ]);
    }
}
exports.LogErrors = LogErrors;
//# sourceMappingURL=logErrors.controller.js.map