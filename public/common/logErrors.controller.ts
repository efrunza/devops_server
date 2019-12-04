import * as sql from '../../Application/node_modules/mssql';
import { SQLDBProvider } from '../providers/dbProvider/sqlDBPovider';

// This class static method is used to log the application's errors into the database.

export class LogErrors {

    constructor() {};

    public static logErrorsToDB(err: any) {

        let provider = new SQLDBProvider();
        let errStack: string = "";

        if (err.stack)  {
            errStack = err.stack;
        }
        provider.executeSPWithParameters('sp_LogErrors',
            [
                { name: "errorMessage", dataType: sql.NVarChar, value: err },
                { name: "errorStack", dataType: sql.NVarChar, value: errStack }
            ]);
    }
}