import {ChangeEvent, KeyboardEvent, useState} from 'react'
// import {Button} from "./Button";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

type PropsType = {
    addTask: (newTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim())
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

    const styles = {
        maxWidth: '39px',
        maxHeight: '39px',
        minHeight: '39px',
        minWidth: '39px',
    }

    return (
        <div>

            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={taskTitle}*/}
            {/*    onChange={changeTaskTitleHandler}*/}
            {/*    onKeyUp={addTaskOnKeyUpHandler}*/}
            {/*/>*/}

            <TextField
                error={!!error }
                size='small'
                id="outlined-basic"
                label={error ? 'title is required' : 'type something'}
                variant="outlined"
                // className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />

            {/*<Button title={'+'} onClick={addTaskHandler}/>*/}
            <Button onClick={addTaskHandler}
                    sx={styles}
                    variant="contained">+</Button>
            {error && <div className={'error-message'}></div>}
        </div>
    )
}