import { NextFunction, Request, Response, Router } from "express";
import TodoModel from "../3-models/todo-model";
import { createNewTodo, deleteTodo, getAll, updateTodo } from "../4-logic/todo-logic";


export const toDoRouter = Router();


toDoRouter.get("/todo", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const todo = await getAll();
        return res.json(todo);

    } catch (error) {
        next(error);
    }
});



toDoRouter.post("/todo", async (req: Request, res: Response, next: NextFunction) => {

    try {
        req.body.isActive = true;

        const todo = new TodoModel(req.body);
        const newTodo = await createNewTodo(todo);

        return res.json(newTodo);

    } catch (error) {
        next(error);
    }

});


toDoRouter.put("/todo/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.id = +request.params.id;

        const todoUpdate: TodoModel = new TodoModel(request.body);
        const todo = await updateTodo(todoUpdate);

        return response.json(todo);

    } catch (error) {
        next(error);
    };
});




toDoRouter.delete("/todo/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    try {

        const id = +request.params.id;

        await deleteTodo(id);
        response.status(204).send('Vacation deleted successfully');

    } catch (error) {
        next(error);
    }
});







