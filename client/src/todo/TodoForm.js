import React from 'react';
import { todosPushDataAction, todosFetchData } from '../actions/todos';
import { connect } from 'react-redux';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            data: {
                text: ''
            }
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.wasUpdated !== prevProps.wasUpdated) {
            this.props.fetchData("/api/todos")
        }
    }
    
    handleChange = (event) => {
        
        this.setState({  
            data: {
                [event.target.name]: event.target.value
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const data = { 
            text: this.state.data.text,
            position: this.props.todos.length !== 0 ? this.props.todos.length + 1 : 1
        }
        console.log('DataNow: ', data);

        this.props.todosPushDataAction("/api/todos", data);

        this.setState({
            data: {
                text: ''
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name = 'text' 
                    value = {this.state.text} 
                    onChange = {this.handleChange} 
                    placeholder = 'To do...' 
                />
                <button onClick={this.handleSubmit}> add </button>
            </form>
        )
    }
}

const mapStateToProps = state => { //передача даних в store
    return {
        todos: state.fetchTodosReducer,
        wasUpdated: state.updateTodosReducer
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(todosFetchData(url)),
        todosPushDataAction: (url, data) => dispatch(todosPushDataAction(url, data))//прокидує функцію в якості пропсів
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps) (TodoForm);

