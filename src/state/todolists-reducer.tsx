import React, {useState} from 'react';
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionsType = {
    type: string
    payload: any
}

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]


const TodoListsReducer = (state: TodolistType[] = initialState, action: TodolistsReducerType):TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST" :{
            let newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default: throw new Error("I don't understand this type")
    }
};

type TodolistsReducerType =
    RemoveTodolistACType |
    AddTodolistACType |
    ChangeTodolistTitleACType |
    ChangeTodolistFilterACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id,
        },
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    }as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitle>
export const changeTodolistTitle = (id: string,title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    }as const
}


type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilter>
export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    }as const
}


export default TodoListsReducer;