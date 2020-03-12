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

export default App;
