import React, { Component } from 'react';
import { connect } from 'react-redux';
import { todosFetchData } from './actions/todos';

class Test extends Component {
    componentDidMount() {
        this.props.fetchData('/api/todos');
    }
    render() {
        return (
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(todosFetchData(url))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Test);