import React, { Component } from 'react';
import TodoList from './todo/TodoList';
// import Test from './test';
import { connect } from 'react-redux';
import { todosFetchData } from './actions/todos';


class App extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.props.fetchData('/api/todos');
  }
 
render() {
  return (
      <div className = 'App'>
          <ul> 
            {this.props.todos.map((todo, i) => {
              return <li key={i}>
                <div> {todo.text} </div> 
                <div> Pos: {todo.position} </div> 
                </li>
            })}
           
          </ul>

  {/* <TodoList /> */}
        </div>
    );
  }
}

const mapStateToProps = state => { //передача даних в store
  return {
      todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(todosFetchData(url)) // це функция, що на видповидь урл видправляэ нашу дату
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

