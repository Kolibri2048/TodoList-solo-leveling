import React from 'react';
import {TaskType} from "./App";
import Button from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

const Todolist = ({title, tasks, removeTask}: PropsType) => {

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
                            <button onClick={() =>removeTask(task.id)}>X</button>
                        </li>
                    )
                })}

            </ul>
            )}

            <div>
                <Button title={'All'}></Button>
                <Button title={'Active'}></Button>
                <Button title={'Completed'}></Button>
            </div>
        </div>
    )
        ;
};

export default Todolist;