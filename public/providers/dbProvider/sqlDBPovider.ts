import * as sql from '../../../Application/node_modules/mssql';
import { ServerConstants } from '../../common/envConstants';

// This is the database's driver.

// It contains methods that executes queries or stored procedures.

export class SQLDBProvider
{
    private config: any;

    constructor()
    {    
        let envConstants = new ServerConstants();        
        
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

    public async getConnection(): Promise<any> {

        return new sql.ConnectionPool(this.config).connect() ;       
    }       

    public async executeQuery(insertQuery, inputParameters): Promise<any> {

        const pool = await this.getConnection();

        let request = pool.request();

        inputParameters.forEach(function (p) {
            request.input(p.name, p.dataType, p.value);
        });

        return request.query(insertQuery);
    }

    public async executeSPWithParameters(procedureName: string, inputParameters:any[]): Promise<any> {

        const pool = await this.getConnection();
    
        let request = pool.request();

        inputParameters.forEach(function(p) {
            request.input(p.name, p.dataType, p.value);
        });

        return request.execute(procedureName)
    }

    public async executeSPWithParametersAndOutputParameter(procedureName: string, inputParameters: any[], outputParameters: any[]): Promise<any> {

        const pool = await this.getConnection();

        let request = pool.request();

        inputParameters.forEach(function (p) {
            request.input(p.name, p.dataType, p.value);
        });

        outputParameters.forEach(function (p) {
            request.output(p.name, p.dataType, p.value);
        });

        return request.execute(procedureName)
    }
}

