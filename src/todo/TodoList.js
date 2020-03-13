import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';


export default class TodoList extends React.Component {
    state = {
        todos: []
    };

    addTodo = (todo) => {
        this.setState({
            todos: [...this.state.todos, todo]
        });
    };

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    };

    changePos = (id, changeIndex1, changeIndex2) => {
        let newTodos = this.state.todos.slice();

        for (let i = 0; i < newTodos.length; i++) { 

            if (newTodos[i].id === id) {
                newTodos[i+changeIndex1].position -= 1;
                newTodos[i-changeIndex2].position += 1;
            }   
        } 
        newTodos = newTodos.sort(function(a, b) {
            return a.position - b.position;
        })
        return newTodos;
    }

    upElement = (id) => {

        let newTodos = this.changePos(id, 0, 1);

        this.setState({
            todos: [...newTodos]
        });
    }

    downElement = (id) => {
        let newTodos = this.changePos(id, 1, 0);      
       
        this.setState({
            todos: [...newTodos]
        });
    }

    render() {
        return (
            <div className = "wrapper">  
                <ul>
                    {this.state.todos.map(todo => (
                        <TodoItem 
                            length = {this.state.todos.length}
                            pos = {todo.position}
                            key = {todo.id} 
                            text = {todo.text} 
                            onDelete= {() => this.deleteTodo(todo.id)} 
                            upTodo = {() => this.upElement(todo.id)} 
                            downTodo= {() => this.downElement(todo.id)}
                            />
            ))}    
                </ul>
                <TodoForm onSubmit={this.addTodo} todos={this.state.todos}/>
            </div>
        );
    }
}