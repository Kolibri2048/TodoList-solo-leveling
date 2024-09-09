import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Button";
import {isDisabled} from "@testing-library/user-event/utils/misc/isDisabled";

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
    const [error, setError] = useState(false)
    const [isHide, setIsHide] = useState(false)

    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
        } else {
            setError(true)
        }
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

    const activeTaskForHideMode = isHide
        ? getFilteredTasks(tasks, 'active').length
        : null

    const taskForTodoList: Array<TaskType> = getFilteredTasks(tasks, filter)
    return (

        <div>

            <h3>{title}
                <Button title={isHide ? 'Show' : 'Hide'} onClick={toggleHideTodoList}/>
            </h3>
            {isHide && <div>{`В тудулисте всего ${activeTaskForHideMode} не выполненых задач.`}</div>}
            {!isHide && <>
                <div>
                    <input value={taskTitle}
                           onChange={changeTaskTitleHandler}
                           onKeyUp={addTaskOnKeyUpHandler}
                           className={error ? 'task-input-error' : ''}
                    />
                    <Button
                        title={'+'}
                        isDisable={!taskTitle}
                        onClick={() => addTaskHandler()}
                    />
                    {error && <div style={{color: "red"}}>Введите название таски</div>}
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

                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    changeTaskStatus(task.id, e.currentTarget.checked)

                                }
                                const taskClass = task.isDone ? 'task-done' : 'task'
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox"
                                               checked={task.isDone}
                                               onChange={changeTaskStatusHandler}
                                        />
                                        <span className={taskClass}>{task.title}</span>
                                        <Button title={'x'} onClick={removeTaskHandler}></Button>
                                    </li>
                                )
                            })}

                        </ul>
                    )
                }

                <div className={'btns-filter-block'}>
                    <Button
                        title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}
                        classes={filter === 'all' ? 'btn-filter-active' : 'btn-filter'}
                    />
                    <Button title={'Active'}
                            onClick={() => changeFilterTasksHandler('active')}
                            classes={filter === 'active' ? 'btn-filter-active' : 'btn-filter'}
                    />
                    <Button title={'Completed'}
                            onClick={() => changeFilterTasksHandler('completed')}
                            classes={filter === 'completed' ? 'btn-filter-active' : 'btn-filter'}
                    />
                </div>
            </>
            }
        </div>
    )
};

export default Todolist;