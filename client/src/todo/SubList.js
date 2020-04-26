import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import {addNewTodosArrAction} from '../redux/actions/todos';


class SubList extends React.Component {

    updateHelper = (newTodos) => {
        const {todo, addNewTodosArr, allTodos} = this.props;
        todo.subList = [...newTodos];
        addNewTodosArr(allTodos);
    }

    addTodo = (newTodo) => {
        const {todo, addNewTodosArr, allTodos} = this.props;
        todo.subList = [...todo.subList, newTodo];
        addNewTodosArr(allTodos);

    };

    deleteTodo = (id) => {
        const {todo} = this.props;
        let newTodos = [...todo.subList];
        newTodos = newTodos.filter(todo => todo.clientId !== id);
        this.updateHelper(newTodos);
        
    };
   

    changePos = (id, changeIndex1, changeIndex2) => {
        const {todo} = this.props;
        let newTodos = todo.subList.slice(); 
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
        const {todo, allTodos} = this.props;
        const {subList} = this.props.todo;
        return ( 
            
            <div className = "wrapper"> 
          
                <ul> 
                   { todo.subList.map((todo) => (
                        <TodoItem 
                            todo = {todo}
                            allTodos = {allTodos}
                            localTodos = {subList}
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
                    todos = {todo.subList} 
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