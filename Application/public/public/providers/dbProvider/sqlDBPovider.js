"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("../../../Application/node_modules/mssql");
const envConstants_1 = require("../../common/envConstants");
// This is the database's driver.
// It contains methods that executes queries or stored procedures.
class SQLDBProvider {
    constructor() {
        let envConstants = new envConstants_1.ServerConstants();
        this.config = {
            user: "efrunza",
            password: "Athena123@",
            server: "senecasql.database.windows.net",
            database: "seneca_demo",
            options: {
                encrypt: true
            }
        };
    }
    async getConnection() {
        return new sql.ConnectionPool(this.config).connect();
    }
    async executeQuery(insertQuery, inputParameters) {
        const pool = await this.getConnection();
        let request = pool.request();
        inputParameters.forEach(function (p) {
            request.input(p.name, p.dataType, p.value);
        });
        return request.query(insertQuery);
    }
    async executeSPWithParameters(procedureName, inputParameters) {
        const pool = await this.getConnection();
        let request = pool.request();
        inputParameters.forEach(function (p) {
            request.input(p.name, p.dataType, p.value);
        });
        return request.execute(procedureName);
    }
    async executeSPWithParametersAndOutputParameter(procedureName, inputParameters, outputParameters) {
        const pool = await this.getConnection();
        let request = pool.request();
        inputParameters.forEach(function (p) {
            request.input(p.name, p.dataType, p.value);
        });
        outputParameters.forEach(function (p) {
            request.output(p.name, p.dataType, p.value);
        });
        return request.execute(procedureName);
    }
}
exports.SQLDBProvider = SQLDBProvider;
//# sourceMappingURL=sqlDBPovider.js.map