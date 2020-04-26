import { combineReducers } from 'redux';
import { fetchTodosReducer, updateDataReducer, stateTodosReducer, postDataSuccess} from './todos.js';

const rootReducer = combineReducers({
    fetchTodosReducer,
    stateTodosReducer,
    updateDataReducer,
    postDataSuccess
});

export default rootReducer;