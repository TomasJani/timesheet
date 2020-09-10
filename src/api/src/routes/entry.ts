import {Application, Request, Response} from "express";
import EntriesController from "../controllers/EntriesController";
import ResultType from "../enums/ResultType";


export function entryRoutes(app: Application): void {
    app.get("/entries", async function (req: Request, res: Response) {
        const entries = EntriesController.GetEntries();
        return res.json(entries);
    });

    app.post("/entries", async (req: Request, res: Response) => {
        const {type, start, end, date, user} = req.body;
        const [result, day] = await EntriesController.NewEntry(type, start, end, date, user);
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