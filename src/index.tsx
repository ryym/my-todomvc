import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { TodoState } from './lib/TodoState';
import { App } from './components/App';

import 'todomvc-app-css/index.css';

const initialPartialState = {
  filters: {
    todoState: TodoState.fromHash(location.hash),
  },
};

const store = configureStore(initialPartialState);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
