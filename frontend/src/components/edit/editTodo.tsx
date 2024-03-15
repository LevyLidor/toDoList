import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TodoModel from '../../models/todo-model';
import { useForm } from 'react-hook-form';
import todoServices from '../../services/todoServices';
import { format } from 'date-fns';


function EditTodo({ id, title, description, date, isActive, refresh, setRefresh }: EditTodoProps) {

    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [isDone, setIsDone] = useState('');
    const handleShow = () => setShow(true);
    const handleClose = () => { setShow(false); setErrMsg(null); reset() };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TodoModel>();

    async function editTodo(_body: TodoModel) {
        try {
            console.log(_body, 'body');

            if (isDone === '0') {
                _body.isActive = false;
            } else if (isDone === '1') {
                _body.isActive = true;
            }

            await todoServices.editTodo(id, _body)
                .then(() => {
                    setErrMsg(null);
                    setShow(false);
                    setRefresh(!refresh);
                    reset();
                })

        } catch (error: any) {

            if (error) {
                console.log(error);
                setShow(true)
                setErrMsg(error.response.data)
            }
        }
    }


    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Edit Todo
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit(editTodo)}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                defaultValue={title}
                                {...register("title", {
                                    required: { value: true, message: 'Title is required' },
                                    minLength: { value: 2, message: 'Title length must be at least 2 characters long' },
                                    maxLength: { value: 45, message: 'Title length must be less than or equal to 45 characters long' }
                                })} />
                            {errors.title?.message && <><span>{errors.title.message}</span><br /></>}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={description}
                                {...register("description", {
                                    required: { value: true, message: 'Description is required' },
                                    minLength: { value: 2, message: 'Description length must be at least 2 characters long' },
                                    maxLength: { value: 255, message: 'Description length must be less than or equal to 255 characters long' }
                                })} />
                            {errors.description?.message && <><span>{errors.description.message}</span><br /></>}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date" defaultValue={`${format(new Date(date), "yyyy-MM-dd")}`}
                                {...register("date", {
                                    required: { value: true, message: 'Date is required' }
                                })} />
                            {errors.date?.message && <span>{errors.date.message}</span>}
                        </Form.Group>


                        <Form.Label>Status:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            defaultValue={isActive ? '1' : '0'}
                            onChange={e => setIsDone(e.target.value)} >
                            <option value={'0'}>Completed</option>
                            <option value={'1'}>In Progress</option>
                        </Form.Select>


                        {errMsg !== null ? <p className='errMsg'>{errMsg}</p>
                            : <></>}

                        <Modal.Footer>
                            <Button variant="secondary" type='button' onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditTodo;