import { ChangeEvent, KeyboardEvent, useState } from 'react'
import {Button} from "./Button";

type PropsType = {
    addTask: (newTitle: string, todoListID: string) => void
    todolistID: string
}

export const AddItemForm = (props: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(props.todolistID, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>

            <input
                className={error ? 'error': ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div> }
        </div>
    )
}