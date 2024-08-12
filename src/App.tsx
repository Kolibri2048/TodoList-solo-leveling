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
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
        console.log('add task')
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let taskForTodoList = tasks
    if (filter === 'active') {
        taskForTodoList = tasks.filter(tasks => !tasks.isDone)
    }
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(tasks => tasks.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
