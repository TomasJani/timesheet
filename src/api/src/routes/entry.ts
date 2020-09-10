import {Application, Request, Response} from "express";
import {getConnection} from "typeorm";
import {Entry} from "../entity/Entry";
import DaysController from "../controllers/DaysController";
import {Day} from "../entity/Day";
import * as moment from 'moment';
import {TIME_FORMAT} from "../constants";


export function entryRoutes(app: Application): void {
    const entriesRepository = getConnection().getRepository(Entry);
    const dayRepository = getConnection().getRepository(Day);

    app.get("/entries", async function (req: Request, res: Response) {
        const entries = await entriesRepository.find({relations: ["day"]});
        return res.json(entries);
    });

    app.post("/entries", async (req: Request, res: Response) => {
        const entry = new Entry(req.body.type, req.body.start, req.body.end);
        const day = await DaysController.FindOrCreateByDate(dayRepository, req.body.date, req.body.user);

        const checkStartEnd = moment(entry.start, TIME_FORMAT).isAfter(moment(entry.end, TIME_FORMAT));
        const doesIntercept = day.entries.find(({start, end}) =>
            !(moment(entry.start, TIME_FORMAT).isSameOrAfter(moment(end, TIME_FORMAT)) ||
            moment(entry.end, TIME_FORMAT).isSameOrBefore(moment(start, TIME_FORMAT)))
        )
        if (doesIntercept || checkStartEnd)
            return res.status(500).send();

        const result = await entriesRepository.save(entry);
        day.entries.push(result);
        await dayRepository.save(day);

        return res.send(day);
    })
}