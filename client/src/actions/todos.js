export function todosFetchDataSuccess(todos) { 
    return {
        type: "TODOS_FETCH_DATA_SUCCESS",
        todos
    }
}

export function postDataSuccess(data) { 
    return {
        type: "POST_DATA_SUCCESS",
        data
    }
}

export function todosUpdated(bool) { 
    return {
        type: "TODOS_WAS_UPDATED",
        wasUpdated: bool
    }
}

export function addDataFromDB (data) { 
    return { 
        type: "ADD_DATA",
        data
    }
}

export function addNewTodosArrAction (todos) {
    return { 
        type: "ADD_NEW_TODOS",
        todos
    }
}

export function todosFetchData(url) { 
    return (dispatch) => {

        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText)
                } 
                    dispatch(todosUpdated(false));
                    return res;
                }) 
                .then(res => res.json())
                .then(todos => dispatch(todosFetchDataSuccess(todos))); 
    }
}

export function todosPushDataAction(url, data) {
    return (dispatch) => {
        fetch(url, {
            method: data._id ? "PUT" : "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        })
            .then(res => res.json())
            .then(res => { 
                dispatch(postDataSuccess(res)); 
                return res
            })
            .then(res => { 
                dispatch(todosUpdated(true));
                return res
            })
            .then(todos => console.log("todosPushDataAction work: ", todos))  
            .catch((error)=> console.log(console.error('Помилка з додаванням todos: ', error.massage)
            ))      
    }
}
