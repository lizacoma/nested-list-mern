import React from 'react';
import shortid from 'shortid';


export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit({
            id: shortid.generate(),
            text: this.state.text,
            position: this.props.todos.length !== 0 ? this.props.todos.length + 1 : 1
        });

        this.setState({
            text: ''
        }); 
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
