"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorhandler = require("errorhandler");
const cors = require("cors");
const router_1 = require("./public/routes/router");
const logErrors_controller_1 = require("./public/common/logErrors.controller");
// This is the server's class.
// The server's class responsabilities are the following:
//  -   register the middleware.
//  -   initiate the routes, creates the server and listen on a port.
//  -   catch application's global errors and log them into the database. (dbo.LogErrors table.)
// The server uses Morgan logs as well and log the api calls into a file ("access.log").
class Server {
    constructor() {
        this.port = 5200;
        this.app = express();
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initRoutes();
        this.start();
    }
    start() {
        this.app.use(this.logErrors);
        this.app.listen(this.port, (err) => {
            logErrors_controller_1.LogErrors.logErrorsToDB("azure devops build 1");
            console.log('Listening on http://localhost:%d', process.env.NODE_ENV, this.port);
        });
    }
    logErrors(err, req, res, next) {
        if (err.stack) {
            console.error(err.stack);
            logErrors_controller_1.LogErrors.logErrorsToDB(err);
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
            if (err)
                console.log(err, err.stack);
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
        (new router_1.Router()).load(this.app, './controllers');
    }
}
let server = new Server();
//# sourceMappingURL=app.js.map