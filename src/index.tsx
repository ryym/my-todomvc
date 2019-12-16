import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { TodoState } from './lib/TodoState';
import { TodoStorage } from './lib/TodoStorage';
import { App } from './components/App';

import 'todomvc-app-css/index.css';

const main = () => {
  const todoStorage = new TodoStorage(window.localStorage);

  const initialPartialState = {
    todos: todoStorage.load() || [],
    filters: {
      todoState: TodoState.fromHash(location.hash),
    },
  };

  const store = configureStore(initialPartialState);
  todoStorage.saveOnChange(store);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

main();
