import React, { Component } from 'react';
import TodoList from './todo/TodoList'


class App extends Component {
  state = {
    count: 0
  };

render() {
  return (
    <div className = 'App'>
<TodoList />
    </div>
  );
}
}

// function App() {

 

//   function todoDone(id) {

//     todos = todos.map(todo => {
// if (todos.id === id) {
//   todo.completed = !todo.completed
// }
//     });
//   }

//   function deleteTodo(id) {
// set
//   }

//   return (
//     <Context.Provider value={{}}>  
   
//     <div className = 'wrapper'>

// <TodoList todos={todos} done={todoDone}/>
// <input /> <button className = 'add-new-todo'> add </button>
//     </div>
//     </Context.Provider>
//   )
// }



export default App;
