import React from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter:FilterValuesType) => void
    addTask: (title:string) => void
}

const Todolist = ({title, tasks, removeTask, changeFilter,addTask}: PropsType) => {

    return (

        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button onClick={() =>addTask('sdasd')} title={'+'}></Button>
            </div>
            {tasks.length === 0 ? (
                <p>no tasks</p>
            ) : (
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox"
                                   checked={task.isDone}
                            />
                            <span>{task.title}</span>
                            <Button title={'x'} onClick={() =>removeTask(task.id)}></Button>
                        </li>
                    )
                })}

            </ul>
            )}

            <div>
                <Button title={'All'} onClick={() =>changeFilter('all')}></Button>
                <Button title={'Active'} onClick={() =>changeFilter('active')}></Button>
                <Button title={'Completed'} onClick={() =>changeFilter('completed')}></Button>
            </div>
        </div>
    )
        ;
};

export default Todolist;