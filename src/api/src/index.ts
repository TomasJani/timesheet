import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Application } from "express";
import { routes } from "./routes/routes";


createConnection().then(async () => {
    const app: Application = express();
    const port: string = process.env.PORT || "5000";

    routes(app);

    app.listen(port, function () {
        console.log(`App is listening on port ${port}`);
    });
}).catch(error => console.log(error));
