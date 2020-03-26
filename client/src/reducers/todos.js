export function todos (state = [], action) { // перший параметр - початковий стейт, другий - акшен, який його змінює
    switch (action.type) {
        case "TODOS_FETCH_DATA_SUCCESS":
            return action.todos;
        default:
            return state;
    }
}