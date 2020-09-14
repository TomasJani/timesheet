import {Application, Request, Response} from "express";
import DayService from "../services/DayService";


export function dayRoutes(app: Application): void {

    app.get("/days", async function(req: Request, res: Response) {
        const days = await DayService.GetDays();
        return res.json(days);
    });

    app.get("/days/:n", async (req: Request, res: Response) => {
        const {date, user} = req.query;
        const {n} = req.params;
        if (date === undefined || user === undefined || n === undefined)
            return res.status(405).send();

        const data = await DayService.GetUsersDays(String(date), String(user), +n);
        return res.send(data.filter(day => day));
    })
}