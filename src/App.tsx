import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    filter: FilterValuesType
    title: string
}

export type TasksStateType = {
    [key: string] : TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodoListType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
        // 	const filteredTasks = tasks[0].filter((task) => {
        // 		return task.id !== taskId
        // 	})
        // 	setTasks(filteredTasks)
        // }
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask = {
        	id: v1(),
        	title: title,
        	isDone: false
        }
		setTasks({...tasks, [todolistID] : [newTask, ...tasks[todolistID] ]})
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID] : tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
        // 	const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        // 	setTasks(newState)
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                }

                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        filter={el.filter}
                    />
                )
            })}


        </div>
    );
}


export default App;
