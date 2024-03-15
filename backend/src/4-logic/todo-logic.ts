import { ResultSetHeader } from "mysql2/promise";
import { execute } from "../1-utils/dal";
import ErrorModel from "../3-models/model";
import TodoModel from "../3-models/todo-model";


//GetAllTodo 
export async function getAll() {

    const query = `SELECT * FROM todolist.todo`;
    const [rows] = await execute<TodoModel[]>(query);
    if (rows.length === 0) throw new ErrorModel(404, 'Todo list is empty');


    return { todo: rows }
}


//createNewTodo
export async function createNewTodo(todo: TodoModel) {

    const errors = todo.validatePost();
    if (errors) throw new ErrorModel(400, errors);


    const query = `INSERT INTO todolist.todo
    (title, description, date, isActive)
     VALUES (?, ? ,? ,?)`;
     
    const [rows] = await execute<ResultSetHeader>(query, [todo.title, todo.description, todo.date, todo.isActive]);
    const id = rows.insertId;

    return {
        id,
        title: todo.title,
        description: todo.description,
        date: todo.date,
        isActive: todo.isActive,
    };

}



export async function updateTodo(todo: TodoModel) {

    const errors = todo.validatePut();
    if (errors) throw new ErrorModel(400, errors);

    const query1 = "SELECT * FROM todolist.todo WHERE id = ? ";
    const [rows1] = await execute<TodoModel>(query1, [todo.id]);
    if (rows1.length === 0) throw new ErrorModel(404, `Bad id: ${todo.id} Not Found`);


    const query = `UPDATE todolist.todo 
     SET title = ?, description = ?, date = ?, isActive = ?
     WHERE (id = ${todo.id})`;

     if(todo.isActive == null){
        todo.isActive = rows1[0].isActive;
     }

    await execute<ResultSetHeader>(query,[todo.title, todo.description, todo.date, todo.isActive]);

    return {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        date: todo.date,
        isActive: todo.isActive
    }

}



export async function deleteTodo(id: number) {

    const query1 = "SELECT * FROM todolist.todo WHERE id = ?;";
    const [rows1] = await execute<TodoModel>(query1, [id]);
    if (rows1.length === 0) throw new ErrorModel(404, `Bad id: ${id} Not Found`);

    const query = "DELETE FROM todolist.todo WHERE id = ?";
    await execute<ResultSetHeader>(query, [id]);

}

