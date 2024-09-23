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

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

	const [todolists, setTodolists] = useState<TodoListType[]>([
		{id: v1(), title: 'What to learn', filter: 'all'},
		{id: v1(), title: 'What to buy', filter: 'completed'}
	])


	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])



	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const addTask = (title: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}

	const changeFilter = ( todoListId:string, filter: FilterValuesType) => {
		setTodolists(todolists.map(el => el.id === todoListId ? {...el,filter: filter} : el))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
		const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		setTasks(newState)
	}



	return (
		<div className="App">
			{todolists.map(el => {
				let tasksForTodolist = tasks
				if (el.filter === 'active') {
					tasksForTodolist = tasks.filter(task => !task.isDone)
				}

				if (el.filter === 'completed') {
					tasksForTodolist = tasks.filter(task => task.isDone)
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
						filter={el.filter}
					/>
				)
			})}




		</div>
	);
}

export default App;
