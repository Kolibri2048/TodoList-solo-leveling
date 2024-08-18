import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus}: PropsType) => {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [taskTitle, setTaskTitle] = useState('')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }



    // const taskForTodoList: Array<TaskType> = filter === 'active'
    //     ? tasks.filter(t => !t.isDone)
    //     : filter === 'completed'
    //         ? tasks.filter(t => t.isDone)
    //         : tasks

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case 'completed' :
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }

    }

    const taskForTodoList: Array<TaskType> = getFilteredTasks(tasks, filter)
    return (

        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onClick={() => addTaskHandler()}
                />
            </div>
            {
                tasks.length === 0 ? (
                    <p>no tasks</p>
                ) : (
                    <ul>
                        {taskForTodoList.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                             const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)

                            return (
                                <li key={task.id}>
                                    <input type="checkbox"
                                           checked={task.isDone}
                                           onChange={changeTaskStatusHandler}
                                    />
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={removeTaskHandler}></Button>
                                </li>
                            )
                        })}

                    </ul>
                )
            }

            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('all')}></Button>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('active')}></Button>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}></Button>
            </div>
        </div>
    )
        ;
};

export default Todolist;