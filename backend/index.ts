import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import errorsHandler from "./src/2-middleware/errors-handler";
import ErrorModel from "./src/3-models/model";
import { toDoRouter } from "./src/5-controllers/todo-controller";

const port = 3000;
const server = express();

server.use(json());
server.use(cors());

server.use('/api', toDoRouter);


server.use('*', (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Rout Not Found"));
});

server.use(errorsHandler);

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})


