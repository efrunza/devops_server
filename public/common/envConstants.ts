const keyNames = [
    'DBUSER',
    'DBPW',
    'DBSERVER',
    'DBNAME',
    'ENVNAME'
  ];

//This class get and set environment variables

export class ServerConstants
{
    private keyValueMap: any; 

    constructor(){
        this.loadConstantsFromEnvironmentFile();
    };

    public loadConstantsFromEnvironmentFile()
    {
        console.log('Loading Environment Variables');

        this.keyValueMap = new Map();
        
        for (let i = 0; i < keyNames.length; i++) {
            this.keyValueMap.set(keyNames[i], process.env[keyNames[i]]);
        }

        console.log('Environment Variables load complete');       
    }

    public getValueMap()
    {
        return this.keyValueMap;
    }
}