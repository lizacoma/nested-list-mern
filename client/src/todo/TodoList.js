import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { todosFetchData, todosPushDataAction, addNewTodosArrAction, addDataFromDB, todosUpdated} from '../actions/todos';


class TodoList extends React.Component {

    componentDidMount () {
        this.props.fetchData('/api/todos');
    }; 

    componentDidUpdate(prevProps) {
        if (this.props.wasUpdated !== prevProps.wasUpdated) {

            if (this.props.state.stateTodosReducer._id === undefined) {

                this.props.addDataFromDB(this.props.responseAfterPost);
            }
        }

    }

    downloadData = async () => {

        this.props.addDataFromDB(this.props.Data);
    };

    addTodo = (todo) => {

        let newTodoList = [...this.props.stateTodos, todo];
        this.props.addNewTodosArr(newTodoList);

    };

    deleteTodo = (id) => {
  
        let newTodos = this.props.stateTodos.filter(todo => todo.clientId !== id);
        this.props.addNewTodosArr(newTodos);
        
    };

    changePos = (id, changeIndex1, changeIndex2) => {
        
        let newTodos = this.props.stateTodos.slice(); 
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
        this.props.addNewTodosArr(newTodos);
    }

    downElement = (id) => {

        let newTodos = this.changePos(id, 1, 0);      
        this.props.addNewTodosArr(newTodos);
    }

    saveData = async () => {
        
        this.props.pushData('/api/todos', this.props.state.stateTodosReducer);

    }

    render() { 
 
        return ( 
            
            <div className = "wrapper"> 
            { this.props.Data === undefined ? '' : <button onClick = {this.downloadData}>  Download todo-list </button>}
                <ul> 
                    {this.props.stateTodos.map((todo) => (
                        <TodoItem 
                            allTodos = {this.props.stateTodos}
                            localTodos = {this.props.stateTodos}
                            todo = {todo}
                            key = {todo.clientId} 
                            id = {todo.clientId} 

                            onDelete= {() => this.deleteTodo(todo.clientId)} 
                            upTodo = {() => this.upElement(todo.clientId)} 
                            downTodo= {() => this.downElement(todo.clientId)}
                            />
                        ))}    
                </ul>
                
                <TodoForm 
                onSubmit = {this.addTodo} 
                todos = {this.props.stateTodos} 
                />

                <button onClick = {this.saveData}>  Save todo-list </button>
               
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state,
        Data: state.fetchTodosReducer[0], //отримує state з БД
        responseAfterPost: state.postDataSuccess,
        stateTodos: state.stateTodosReducer.todoList,
        wasUpdated: state.updateDataReducer
        
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      fetchData: url => dispatch(todosFetchData(url)), // отримує дані з бд
      addDataFromDB: (data) => dispatch(addDataFromDB(data)), // завантажує дані з бд в store
      pushData: (url, data) => dispatch(todosPushDataAction(url, data)), //завантажує дані В бд
      addNewTodosArr: (todos) => dispatch(addNewTodosArrAction(todos)),
      updateTodos: (bool) => dispatch(todosUpdated(bool)) //оновлює масив в store
      
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps) (TodoList);