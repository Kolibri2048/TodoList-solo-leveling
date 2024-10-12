import './App.css';
import {Todolist} from "./Todolist";
import React, {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

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
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
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

    }
    const addTask = (todolistID: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})

    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})

    }

    const removeTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    const addTodoList = (title: string) => {
        const todolistId = v1()
        let newTodo: TodoListType = {
            id: todolistId,
            title,
            filter: 'all',
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [todolistId]: []})
    }


    const updateTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
        // map - update, filter - delete
    }

    const updateTodoListTitle = (todoListsID: string, newTitle: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListsID ? {...el, title: newTitle} : el))
    }


    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <Grid container sx={{ mb: '30px' }}>
                    <AddItemForm addTask={addTodoList}/>
                </Grid>


                <Grid container spacing={3}>
                    {
                        todoLists.map(el => {
                            let tasksForTodolist = tasks[el.id]
                            if (el.filter === 'active') {
                                tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                            }

                            if (el.filter === 'completed') {
                                tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                            }
                            return <Grid item>
                                <Paper elevation={5} style={{padding: '20px'}}>
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
                                    updateTaskTitle={updateTaskTitle}
                                    updateTodoListTitle={updateTodoListTitle}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>


        </div>
    );
}


export default App;
