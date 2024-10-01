import React, {ChangeEvent, useState} from 'react';

type editableSpanPropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

const EditableSpan = (props: editableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const editModeHandler = () => {
        setEditMode(!editMode)
        if(editMode) {
            props.callBack(newTitle)

        }
    }


    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle (event.currentTarget.value)
    }


    return (
            editMode
            ? <input value={newTitle}
                     onChange={changeTitleHandler}
                     onBlur={editModeHandler}
                     autoFocus

                />
            : <span onDoubleClick={editModeHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;