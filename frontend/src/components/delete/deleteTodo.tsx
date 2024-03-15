import { useState } from 'react'
import { Button, Alert } from 'react-bootstrap';
import todoServices from '../../services/todoServices';
import './DeleteTodo.css';

interface DeleteTodoProps {
    id: number;
    refresh?: boolean;
    setRefresh: (e: boolean) => void;
}

const DeleteTodo = ({ id, refresh, setRefresh }: DeleteTodoProps) => {

    const [show, setShow] = useState(false);


    const deleteTodo = async () => {
        try {
            await todoServices.deleteTodo(id)
            console.log("done");
            setRefresh(!refresh)

        } catch (error) {
            console.log("errMag ", error);
        }
    };


    return (
        <div className='Divdelete'>
            <Alert show={show} variant="danger" className='alertDelete'>

                <Alert.Heading className='text-center'>Delete Todo</Alert.Heading>
                <p className='text-center'> Are you sure you want to delete this Todo? </p>
                <hr />

                <div className='divBtnDelete'>
                    <Button onClick={() => setShow(false)} variant="dark"> Close </Button>
                    <Button className='deleteBtn' onClick={() => {
                        setShow(false);
                        console.log("delete");
                        deleteTodo()
                    }} variant="outline-danger"> Yes </Button>

                </div>
            </Alert>


            {!show &&
                <Button variant="dark" className='bold' id={id.toString()} onClick={() => setShow(true)}>Delete ❌</Button>
            }
        </div>
    )
}

export default DeleteTodo;