import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'


export default class TodoList extends React.Component {
    state = {
        todos: []
    };

    addTodo = (todo) => {
        this.setState({
            todos: [todo,...this.state.todos]
        });
    };

    render() {
        return (
            <div>
            <ul>
                {this.state.todos.map(todo => (
                    <li key={todo.id}> 
                        {todo.text}
                        <button onClick={this.props.deleteTodo}> delete </button>
                    </li>
        ))}
                
            </ul>
            
            <TodoForm onSubmit={this.addTodo} />
            </div>
        );
    }
 }

// TodoList.propTypes = {
//     todos: PropTypes.arrayOf(PropTypes.object).isRequired,
//     done: PropTypes.func.isRequired
// }


