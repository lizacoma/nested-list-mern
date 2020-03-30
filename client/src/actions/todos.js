export function todosFetchDataSuccess(todos) { //викликається в разі успіху і вертає ОБЄКТ. 
    return {
        type: "TODOS_FETCH_DATA_SUCCESS",
        todos
    }
}

export function todosUpdatedSuccess(bool) { //викликається в разі успіху і вертає помітку "вдало"
    return {
        type: "TODOS_WAS_UPDATED",
        wasUpdated: bool
    }
}

export function todosFetchData(url) { //екшон криейтер, який вертає функцію. покликана звератись до API і діставати дані з сервера
    return (dispatch) => {
        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                    return res;
                }) 
                .then(res => res.json())
                .then(todos => dispatch(todosFetchDataSuccess(todos)));
    }
}

export function todosPushDataAction(url, data) {
    return (dispatch) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        })
            .then(res => { console.log('res:', res)
                dispatch(todosUpdatedSuccess(true)); //робить помітку, що все вдалось
                return res
            })
            .then(res => res.json()
                )
            .then(todo => console.log("todosPushDataAction work: ", todo))        
    }
}