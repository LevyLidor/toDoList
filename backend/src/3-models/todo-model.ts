import Joi from "joi";


const date = new Date();
const dateString = date.toISOString().substring(0, 10);


class TodoModel {

    id: number;
    title: string;
    description: string;
    date: Date;
    isActive: Boolean


    constructor(todo: TodoModel) {
        this.id = todo.id;
        this.title = todo.title;
        this.description = todo.description;
        this.date = todo.date;
        this.isActive = todo.isActive
    }

    public validatePost() {
        const result = TodoModel.postValidationSchema.validate(this);
        return result.error?.message;
    };

    public validatePut() {
        const result = TodoModel.putValidationSchema.validate(this);
        return result.error?.message;
    }


    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        title: Joi.string().required().min(2).max(45),
        description: Joi.string().required().min(2).max(250),
        date: Joi.date().min(dateString).required().error(new Error(`Date must be greater than or equal to ${dateString}`)),
        isActive: Joi.boolean()
    });


    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        title: Joi.string().optional().min(2).max(45),
        description: Joi.string().optional().min(2).max(250),
        date: Joi.date().optional(),
        isActive: Joi.boolean().optional()
    });

}

export default TodoModel;

