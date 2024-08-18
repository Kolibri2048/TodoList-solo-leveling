import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {strict} from "assert";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML/CSS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Node.js', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const addTask = (title:string) =>  {
        let newTask = {
            id:v1(),
            title,
            isDone: true
        }
        setTasks([newTask, ...tasks])
    }


    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const nextState: Array<TaskType> = tasks.map(task => task.id === taskID ? {...task, isDone} : task)
        setTasks(nextState)
    }




    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
