import {Application, Request, Response} from "express";
import {getConnection} from "typeorm";
import {Day} from "../entity/Day";
import DaysController from "../controllers/DaysController";


export function dayRoutes(app: Application): void {
    const dayRepository = getConnection().getRepository(Day);

    app.get("/days", async function(req: Request, res: Response) {
        const days = await dayRepository.find({relations: ["entries"]});
        return res.json(days);
    });

    app.get("/days/:n", async (req: Request, res: Response) => {
        const date = String(req.query.date);
        const user = String(req.query.user);
        const n = +req.params.n;
        const data = await DaysController.GetDays(date, user, n);
        return res.send(data.filter(day => day));
    })
}