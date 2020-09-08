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
        const date = req.query.date;
        const data = await DaysController.GetDays(dayRepository, date, req.params.n);
        const cleanData = data.filter(day => day);
        return res.send(cleanData);
    })
}