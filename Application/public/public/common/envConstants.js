"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyNames = [
    'DBUSER',
    'DBPW',
    'DBSERVER',
    'DBNAME',
    'ENVNAME'
];
//This class get and set environment variables
class ServerConstants {
    constructor() {
        this.loadConstantsFromEnvironmentFile();
    }
    ;
    loadConstantsFromEnvironmentFile() {
        console.log('Loading Environment Variables');
        this.keyValueMap = new Map();
        for (let i = 0; i < keyNames.length; i++) {
            this.keyValueMap.set(keyNames[i], process.env[keyNames[i]]);
        }
        console.log('Environment Variables load complete');
    }
    getValueMap() {
        return this.keyValueMap;
    }
}
exports.ServerConstants = ServerConstants;
//# sourceMappingURL=envConstants.js.map