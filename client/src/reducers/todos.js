//редусери покликані обробити наявний стайт(що передається) екшеном (що передається)


export function fetchTodosReducer (state = [], action) { // перший параметр - початковий стейт, другий - акшен, який його змінює
    switch (action.type) {
        case "TODOS_FETCH_DATA_SUCCESS":
            return action.todos;
        default:
            return state;
    }
}

export function updateTodosReducer (state = [], action) {
    switch (action.type) {
        case "TODOS_WAS_UPDATED": 
        return action.wasUpdated;

        default: return state;
    }
    
};