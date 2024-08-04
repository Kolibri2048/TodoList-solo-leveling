import React from 'react';
import './App.css';
import Todolist from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    let tasks1: TaskType[] = [
        {id: 1, title: 'HTML/CSS', isDone: true},
        {id: 2, title: 'React', isDone: true},
        {id: 3, title: 'Node.js', isDone: false},
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]

    const removeTask = (taskId: number) => {
        tasks1 = tasks1.filter(t => t.id !== taskId)
        console.log(tasks1)
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasks1}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
