import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { todosFetchData } from '../actions/todos'




class TodoList extends React.Component {
    state = {
        todos: []
    };

    componentDidMount() {
        this.props.fetchData('/api/todos');
      } 




    // addTodo =  async (todo) => {
    //     // const {loading, error, request} = useHttp();
    //     this.setState({
    //         todos: [...this.state.todos, todo]
    //     });
    //     try {
    //         const data = await request('/api/', 'POST', this.state.todos);
    //         console.log('Done!')
    //     } catch (error) {} 


    // };

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
                    {this.props.todos.map((todo, i) => (
                        <TodoItem 
                            length = {this.props.todos.length}
                            pos = {todo.position}
                            key = {todo.id} 
                            text = {todo.text} 
                            onDelete= {() => this.deleteTodo(todo.id)} 
                            upTodo = {() => this.upElement(todo.id)} 
                            downTodo= {() => this.downElement(todo.id)}
                            />
                        ))}    
                </ul>
                <TodoForm onSubmit={this.addTodo} todos={this.props.todos}/>
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

  export default connect(mapStateToProps,mapDispatchToProps) (TodoList);