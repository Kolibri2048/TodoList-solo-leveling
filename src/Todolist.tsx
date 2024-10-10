import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
// import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type PropsType = {
    title: string
    todoListID: string
    tasks: TaskType[]

    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTaskTitle: (todoListId: string, taskId: string, title: string) => void
    updateTodoListTitle: (todoListId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {tasks, filter, removeTask, changeFilter, changeTaskStatus, removeTodolist} = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(props.todoListID, filter)
    }

    const removeTodoListHandler = () => {
        removeTodolist(props.todoListID)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }

    const changeTodoListTitleHandler = (newTitle: string) => {
        props.updateTodoListTitle(props.todoListID, newTitle)
    }

    const updateTaskTitleHandler = (tID: string, newTitle: string) => {
        props.updateTaskTitle(props.todoListID, tID, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={changeTodoListTitleHandler}/>
                {/*{props.title}*/}
                <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
                {/*<button >X</button>*/}

            </h3>
            <div>
                <AddItemForm addTask={addTaskHandler}/>

            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(props.todoListID, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(props.todoListID, task.id, newStatusValue)
                            }


                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan oldTitle={task.title}
                                              callBack={(newTitle) => updateTaskTitleHandler(task.id, newTitle)}/>
                                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                                {/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button variant={filter === 'all' ? "outlined" : 'contained'}
                        color="error"
                        onClick={() => changeFilterTasksHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? "outlined" : 'contained'}
                        onClick={() => changeFilterTasksHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? "outlined" : 'contained'}
                        color="secondary"
                        onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>

                {/*<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>*/}
                {/*<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}*/}
                {/*        onClick={() => changeFilterTasksHandler('active')}/>*/}
                {/*<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}*/}
                {/*        onClick={() => changeFilterTasksHandler('completed')}/>*/}
            </div>
        </div>
    )
}