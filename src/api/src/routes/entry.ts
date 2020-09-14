import {Application, Request, Response} from "express";
import ResultType from "../enums/ResultType";
import EntryService from "../services/EntryService";


export function entryRoutes(app: Application): void {
    app.get("/entries", async function (req: Request, res: Response) {
        const entries = await EntryService.GetEntries();
        return res.json(entries);
    });

    app.post("/entries", async (req: Request, res: Response) => {
        const {type, start, end, date, user} = req.body;
        if (type === undefined || start === undefined || end === undefined || date === undefined || user === undefined)
            return res.status(405).send();
        const [result, day] = await EntryService.NewEntry(type, start, end, date, user);
        switch (result) {
            case ResultType.ERROR:
                return res.status(500).send();
            case ResultType.SUCCESS:
                return res.send(day);
            default:
                throw "Result type not implemented"
        }
    })
}