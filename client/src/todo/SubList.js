import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import {addNewTodosArrAction} from '../actions/todos';


class SubList extends React.Component {

    updateHelper = (newTodos) => {

        this.props.todo.subList = [...newTodos];
        this.props.addNewTodosArr(this.props.allTodos);
    }

    addTodo = (todo) => {
      
        this.props.todo.subList = [...this.props.todo.subList, todo];
        this.props.addNewTodosArr(this.props.allTodos);

    };

    deleteTodo = (id) => {
        
        let newTodos = this.props.todo.subList.filter(todo => todo.clientId !== id);
        this.updateHelper(newTodos);
        
    };
   

    changePos = (id, changeIndex1, changeIndex2) => {
        
        let newTodos = this.props.todo.subList.slice(); 
        for (let i = 0; i < newTodos.length; i++) { 

            if (newTodos[i].clientId === id) {
                let buffer = newTodos[i+changeIndex1].position;
                
                newTodos[i+changeIndex1].position = newTodos[i-changeIndex2].position;
                newTodos[i-changeIndex2].position = buffer;
            }   
        } 
        
        return newTodos = newTodos.sort(function(a, b) { 
            return a.position - b.position;
        })
        
    }

    upElement = (id) => {
       
        let newTodos = this.changePos(id, 0, 1);
        this.updateHelper(newTodos); 
        
    }

    downElement = (id) => {

        let newTodos = this.changePos(id, 1, 0); 
        this.updateHelper(newTodos);
    }


    render() { 
 
        return ( 
            
            <div className = "wrapper"> 
          
                <ul> 
                   { this.props.todo.subList.map((todo) => (
                        <TodoItem 
                            todo = {todo}
                            allTodos = {this.props.allTodos}
                            localTodos = {this.props.todo.subList}
                            key = {todo.clientId} 
                            id = {todo.clientId} 
                            
                            onDelete= {() => this.deleteTodo(todo.clientId)} 
                            upTodo = {() => this.upElement(todo.clientId)} 
                            downTodo= {() => this.downElement(todo.clientId)}
                            />
                        ))
                        }    
                </ul>
                
                <TodoForm 
                    onSubmit = {this.addTodo} 
                    todos = {this.props.todo.subList} 
                />

               
            </div>
        );
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      addNewTodosArr: (todos) => dispatch(addNewTodosArrAction(todos)),
    };
  };

  export default connect(null,mapDispatchToProps) (SubList);