import React from 'react';
import SubList from './SubList';
import { connect } from 'react-redux';
import {addNewTodosArrAction} from '../actions/todos';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: this.props.todo.subList.length > 0? true : false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
        }));

        if (this.state.isToggleOn) {
            this.props.todo.subList = [];
            console.log('this.props.allTodos: ', this.props.allTodos);
            this.props.addNewTodosArr(this.props.allTodos);
        }
    }

    indexOfItem(id) {
        return this.props.localTodos.findIndex(item => item.clientId === id);
    }

    render() {

        return (
            <li key={this.props.id}> 
                <span> {this.props.todo.text} </span> 
                <div>
                    <button onClick={this.props.onDelete}> Remove </button>
                    <button onClick={this.handleClick}> 
                        {this.state.isToggleOn ? 'Remove Sublist' : 'Add Sublist'} 
                    </button>
                    {this.indexOfItem(this.props.id) !== 0 ? <button onClick = {this.props.upTodo}> up </button> : ''}
                    {this.indexOfItem(this.props.id) !== this.props.localTodos.length -1 ? <button onClick = {this.props.downTodo}> down </button> : ''}   
                </div>

              

                {this.state.isToggleOn ? <SubList todo = {this.props.todo} allTodos = {this.props.allTodos}/> : '' }
            </li>
            )}
        }

        const mapDispatchToProps = dispatch => {
            return {
              addNewTodosArr: (todos) => dispatch(addNewTodosArrAction(todos)),
            };
          };
        
          export default connect(null,mapDispatchToProps) (TodoItem);