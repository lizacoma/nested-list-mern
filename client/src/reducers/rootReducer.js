import { combineReducers } from 'redux';
import { fetchTodosReducer, updateTodosReducer } from './todos.js';

const rootReducer = combineReducers({
    fetchTodosReducer,
    updateTodosReducer
});

export default rootReducer;