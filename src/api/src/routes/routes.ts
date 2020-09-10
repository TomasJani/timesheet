import {Application} from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors"
import {entryRoutes} from "./entry";
import {dayRoutes} from "./day";
import checkJwt from "../auth";
import EntriesController from "../controllers/EntriesController";
import {getConnection} from "typeorm";
import {Entry} from "../entity/Entry";
import {Day} from "../entity/Day";
import DaysController from "../controllers/DaysController";


export function routes(app: Application): void {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(checkJwt);

    const entriesRepository = getConnection().getRepository(Entry);
    const daysRepository = getConnection().getRepository(Day);

    new EntriesController(daysRepository, entriesRepository);
    new DaysController(daysRepository);

    entryRoutes(app);
    dayRoutes(app);
}