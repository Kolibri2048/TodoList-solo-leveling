import React from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter:FilterValuesType) => void
}

const Todolist = ({title, tasks, removeTask, changeFilter}: PropsType) => {

    return (

        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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