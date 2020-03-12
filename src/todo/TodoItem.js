import React from 'react';
import TodoList from './TodoList'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false}

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
        }));
    }


    render() {
       
return (
    <li key={this.props.id}> 
      <span> {this.props.text} </span> 
<div>
     <button onClick={this.props.onClick}> delete </button>
     <button onClick={this.handleClick}> 
     {this.state.isToggleOn ? 'Remove Sublist' : 'Add Sublist'} 
     </button>
     <button> up </button>
     </div>

     {this.state.isToggleOn ? <TodoList/> : '' }
    </li>
    )
    }
}