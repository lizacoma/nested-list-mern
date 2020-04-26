import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { todosFetchData, todosPushDataAction, addNewTodosArrAction, addDataFromDB, todosUpdated} from '../redux/actions/todos';


class TodoList extends React.Component {

    componentDidMount () {
        const {fetchData} = this.props;
        fetchData('/api/todos');
    }; 

    componentDidUpdate(prevProps) {
        const {addDataFromDB, responseAfterPost, wasUpdated, fetchData} = this.props;
        const {stateTodosReducer} = this.props.state;

        if (wasUpdated !== prevProps.wasUpdated) {
            fetchData('/api/todos');

            if (stateTodosReducer._id === undefined) {
                addDataFromDB(responseAfterPost);
            }
        }
    }

    downloadData = async () => {
        const {addDataFromDB, Data} = this.props;
        addDataFromDB(Data);
    };

    addTodo = (todo) => {
        const {stateTodos, addNewTodosArr} = this.props;
        let newTodoList = [...stateTodos, todo];
        addNewTodosArr(newTodoList);

    };

    deleteTodo = (id) => {
        const {stateTodos, addNewTodosArr} = this.props;
        let newTodos = [...stateTodos];
        newTodos = newTodos.filter(todo => todo.clientId !== id);
        addNewTodosArr(newTodos);
        
    };

    changePos = (id, changeIndex1, changeIndex2) => {
        const {stateTodos} = this.props;
        let newTodos = [...stateTodos]; 
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
        const {addNewTodosArr} = this.props;
        addNewTodosArr(newTodos);
    }

    downElement = (id) => {

        let newTodos = this.changePos(id, 1, 0);      
        const {addNewTodosArr} = this.props;
        addNewTodosArr(newTodos);
    }

    saveData = async () => {
        const {pushData} = this.props;
        const {stateTodosReducer} = this.props.state
        pushData('/api/todos', stateTodosReducer);

    }

    render() { 
        const {Data, stateTodos} = this.props;
        return ( 
            
            <div className = "wrapper"> 
            { Data === undefined ? '' : <button onClick = {this.downloadData}>  Download todo-list </button>}
                <ul> 
                    {stateTodos.map((todo) => (
                        <TodoItem 
                            allTodos = {stateTodos}
                            localTodos = {stateTodos}
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
                todos = {stateTodos} 
                />

                <button onClick = {this.saveData}>  Save todo-list </button>
               
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state,
        Data: state.fetchTodosReducer[0], 
        responseAfterPost: state.postDataSuccess,
        stateTodos: state.stateTodosReducer.todoList,
        wasUpdated: state.updateDataReducer
        
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      fetchData: url => dispatch(todosFetchData(url)), 
      addDataFromDB: (data) => dispatch(addDataFromDB(data)), 
      pushData: (url, data) => dispatch(todosPushDataAction(url, data)), 
      addNewTodosArr: (todos) => dispatch(addNewTodosArrAction(todos)),
      updateTodos: (bool) => dispatch(todosUpdated(bool)) 
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps) (TodoList);