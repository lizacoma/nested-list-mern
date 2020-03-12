import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';


export default class TodoList extends React.Component {
    state = {
        todos: []
    };

    addTodo = (todo) => {
        this.setState({
            todos: [todo,...this.state.todos]
        });
    };

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
        console.log(id);
    };

    // findIndex = (value, arr, prop) => {
    //     for(let i=0; i < arr.length; i++) {
    //         if (arr[i][prop] === value) {
    //             return i;
    //         }
    //     }
    //     return -1; 
    // }


    render() {
        // let index = this.findIndex()
        return (
            <div className = "wrapper">  
            {JSON.stringify(this.state.todos[this.state.todos.length-1])} 
                <ul>
                    {this.state.todos.map(todo => (
                        <TodoItem key={todo.id} text={todo.text} onClick={() => this.deleteTodo(todo.id)}/>
            ))}    
                </ul>
                <TodoForm onSubmit={this.addTodo} />
            </div>
        );
    }
}