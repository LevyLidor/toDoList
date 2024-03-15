import { useEffect, useState } from 'react'
import todoServices from '../services/todoServices';
import TodoModel from '../models/todo-model';
import AddTodo from './add/addTodo';
import DeleteTodo from './delete/deleteTodo';
import EditTodo from './edit/editTodo';
import './todo.css';

const Todo = () => {

    const [todo, setTodo] = useState<TodoModel[]>([])
    const [refresh, setRefresh] = useState<boolean>(false);

    const getAllTodo = async () => {
        try {

            await todoServices.getAllTodo()
                .then((res) => {
                    setTodo(res?.todo);
                })

        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        getAllTodo();
    }, [refresh]);


    return (
        <>
            <AddTodo refresh={refresh} setRefresh={setRefresh} />
            <h1 className='header'>Todo List</h1>
            <div className='app'>
                {todo.map((todo: TodoModel) => {
                    return (
                        <div className="todo-item" key={todo.id} id={todo.id.toString()}>
                            <h3 className="todo-title">{todo.title}</h3>
                            <p className="todo-description">{todo.description}</p>
                            <p className="todo-date">Date: {new Date(todo.date).toLocaleDateString()}</p>
                            <p className={todo.isActive ? "todo-status" : "todo-status-finish"}>Status: {todo.isActive ? 'In Progress' : 'Completed'}</p>

                            <div className="button-container">
                                <EditTodo id={todo.id} date={todo.date} description={todo.description} isActive={todo.isActive} title={todo.title}
                                    setRefresh={setRefresh} refresh={refresh} />
                                <DeleteTodo id={todo.id} refresh={refresh} setRefresh={setRefresh} />
                            </div>

                        </div>

                    );
                })}

            </div></>
    )
}

export default Todo