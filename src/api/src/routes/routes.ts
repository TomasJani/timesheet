import {Application} from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors"
import {entryRoutes} from "./entry";
import {dayRoutes} from "./day";
import checkJwt from "../auth";


export function routes(app: Application): void {
    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }

    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(checkJwt);

    entryRoutes(app);
    dayRoutes(app);
}