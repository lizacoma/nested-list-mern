export function todosFetchDataSuccess(todos) {
    return {
        type: "TODOS_FETCH_DATA_SUCCESS",
        todos
    }
}

export function todosFetchData(url) {
    return (dispatch) => {
        fetch(url
            // {
            // method: "get",
            // headers: {
            //     'Accept': 'application/json, text/plain, */*' ,
            //     'Content-Type': 'application/json'
            //   }}
              )
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