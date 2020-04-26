import React, { Component } from 'react';
import TodoList from '../todo/TodoList';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../redux/reducers/rootReducer';


class App extends Component {
 
render() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

  return (
      <div className = 'App'>
          <Provider store={store}>
            <TodoList />
          </Provider>
       </div>
    );
  }
}

export default App;

