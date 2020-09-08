import {Application} from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors"
import {entryRoutes} from "./entry";
import {dayRoutes} from "./days";


export function routes(app: Application): void {
    app.use(bodyParser.json());
    app.use(cors());

    entryRoutes(app);
    dayRoutes(app);
}