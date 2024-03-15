import axios from "axios";
import config from "../utils/config";
import TodoModel from "../models/todo-model";

class TodoServices {

    async getAllTodo() {
        try {
            const { data } = await axios.get(`${config.GET_ALL_TODO_ROUTE}`)
            return data;

        } catch (error) {
            console.log(error);

        }
    }


    async createNewTodo(body : TodoModel) {
            const { data } = await axios.post(config.ADD_TODO_ROUTE , body )
            return data;
    }

    async editTodo(id: number , body:TodoModel ) {
            const { data } = await axios.put(config.EDIT_VACATION_ROUTE + id , body)
            return data;
    }


    async deleteTodo(id: number) {
        try {
            const { data } = await axios.delete(config.DELETE_VACATION_ROUTE + id);
            return data;

        } catch (error) {
            console.log(error);
        }
    }

}

const todoServices = new TodoServices();
export default todoServices