import {Application} from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors"
import {entryRoutes} from "./entry";
import {dayRoutes} from "./days";
import checkJwt from "../auth";


export function routes(app: Application): void {
    app.use(bodyParser.json());
    app.use(cors());

    app.use(checkJwt);

    entryRoutes(app);
    dayRoutes(app);
}