import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as errorhandler from 'errorhandler';
import * as csrf from 'csurf';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as fs from 'fs';
import * as  path from 'path';
import { Router } from './public/routes/router';
import {LogErrors} from './public/common/logErrors.controller'

// This is the server's class.

// The server's class responsabilities are the following:

//  -   register the middleware.
//  -   initiate the routes, creates the server and listen on a port.
//  -   catch application's global errors and log them into the database. (dbo.LogErrors table.)

// The server uses Morgan logs as well and log the api calls into a file ("access.log").

class Server {

	private port:number = 5200;
	private app: any;

    constructor() {

		this.app = express();	

        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initRoutes();
        this.start();        
    }

    start() {       
        this.app.use(this.logErrors)
        this.app.listen(this.port, (err: any) => {
            LogErrors.logErrorsToDB("azure devops build 2");
            console.log('Listening on http://localhost:%d', process.env.NODE_ENV, this.port);
        });
    }

    logErrors(err, req, res, next) {

        if (err.stack) {
            console.error(err.stack);
            LogErrors.logErrorsToDB(err);
        }
               
        next(err);
    }
    
    initExpressMiddleWare() {

        this.app.use(express.static(__dirname + '/public'));       
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        //this.app.use(express.urlencoded());
        //this.app.use(express.json());

        this.app.use(errorhandler());
        this.app.use(cookieParser());
        this.app.use(cors());
        //this.app.use(csrf({ cookie: true }));

        //this.app.use(morgan('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }))
        //this.app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

        /*
        this.app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });
        */

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });       
    }

    initCustomMiddleware() {
        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                process.exit(1);
            });
        }

        process.on('SIGINT', () => {
         process.exit(1);
        });
    }   

    initRoutes() {
        (new Router()).load(this.app, './controllers');        
    }       
}

let server = new Server();