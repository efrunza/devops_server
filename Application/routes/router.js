"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const express = require("express");
// This is the common logic that creates the routes for all the folders located under the "controllers" folder.
class Router {
    constructor() {
        this.startFolder = null;
    }
    //Called once during initial server startup
    load(app, folderName) {
        if (!this.startFolder)
            this.startFolder = path.basename(folderName);
        fs.readdirSync(folderName).forEach((file) => {
            let fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);
            if (stat.isDirectory()) {
                //Recursively walk-through folders
                this.load(app, fullName);
            }
            else if (file.toLowerCase().indexOf('.js') > 0 && file.toLowerCase().indexOf('.map') == -1) {
                //Grab path to JavaScript file and use it to construct the route
                let dirs = path.dirname(fullName).split(path.sep);
                if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
                    dirs.splice(0, 1);
                }
                const router = express.Router();
                //Generate the route
                const baseRoute = '/' + dirs.join('/');
                console.log('Created route: ' + baseRoute + ' for ' + fullName);
                //Load the JavaScript file ("controller") and pass the router to it
                const controllerClass = require('../' + fullName);
                const controller = new controllerClass(router);
                //Associate the route with the router
                app.use(baseRoute, router);
            }
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map