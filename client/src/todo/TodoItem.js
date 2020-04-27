import React from 'react';
import SubList from './SubList';
import { connect } from 'react-redux';
import {addNewTodosArrAction} from '../redux/actions/todos';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        const {todo} = this.props;
        this.state = {
            isToggleOn: todo.subList.length > 0? true : false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
        }));

        if (this.state.isToggleOn) {
            const {todo, addNewTodosArr, allTodos} = this.props;

            todo.subList = [];
            addNewTodosArr([...allTodos]);
        }
    }

    indexOfItem(id) {
        const {localTodos} = this.props;
        return localTodos.findIndex(item => item.clientId === id);
    }

    render() {
        const {id, todo, allTodos, localTodos, upTodo, downTodo, onDelete} = this.props;
        return (
            <li key={id}> 
                <span> {todo.text} </span> 
                <div>
                    <button onClick={onDelete}> Remove </button>
                    <button onClick={this.handleClick}> 
                        {this.state.isToggleOn ? 'Remove Sublist' : 'Add Sublist'} 
                    </button>
                    {this.indexOfItem(id) !== 0 ? <button onClick = {upTodo}> up </button> : ''}
                    {this.indexOfItem(id) !== localTodos.length -1 ? <button onClick = {downTodo}> down </button> : ''}   
                </div>

                {this.state.isToggleOn ? <SubList todo = {todo} allTodos = {allTodos}/> : '' }
            </li>
            )}
        }

        const mapDispatchToProps = dispatch => {
            return {
              addNewTodosArr: (todos) => dispatch(addNewTodosArrAction(todos)),
            };
          };
        
          export default connect(null,mapDispatchToProps) (TodoItem);