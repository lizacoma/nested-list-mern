import {TODOS_FETCH_DATA_SUCCESS, ADD_NEW_TODOS, ADD_DATA, POST_DATA_SUCCESS, TODOS_WAS_UPDATED} from '../constants/types'

const initialState = 
    {
        todoList: []
    }


export function fetchTodosReducer (state = [], action) {
    switch (action.type) {
        case TODOS_FETCH_DATA_SUCCESS:
            return  action.todos

        default: 
            return state;
            
    }
};

export function stateTodosReducer (state = initialState, action) { 
    switch (action.type) {
        case ADD_DATA: 
            return action.data 
            
        case ADD_NEW_TODOS: 
            return  {
                ...state,
                todoList: [...action.todos]
            }
         
        default: 
            return state;
    }
};

export function postDataSuccess (state = {}, action) {
        switch (action.type) {
            case POST_DATA_SUCCESS: 
            return action.data;

            default: 
                return state;
        } 
};

export function updateDataReducer (state = false, action) {
    switch (action.type) {
        case TODOS_WAS_UPDATED: 
        return action.wasUpdated;

        default: 
            return state;
    } 
};

