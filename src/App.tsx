import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {strict} from "assert";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML/CSS', isDone: true},
        {id: 2, title: 'React', isDone: true},
        {id: 3, title: 'Node.js', isDone: false},
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let taskForTodoList = tasks
    if(filter === 'active') {
        taskForTodoList = tasks.filter(tasks => !tasks.isDone)
    }
    if(filter === 'completed') {
        taskForTodoList = tasks.filter(tasks => tasks.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodoList }
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
