import React from 'react';
import { Provider } from 'react-redux';
import { TodoListWithFilter } from './TodoListWithFilter';
import { initState } from '../store/state';
import { mockStore } from './__testlib__/redux';
import { render } from './__testlib__/react';

it('renders nothing when todos are empty', () => {
  const store = mockStore({ ...initState(), todos: [] });
  const container = render(
    <Provider store={store}>
      <TodoListWithFilter></TodoListWithFilter>
    </Provider>
  );
  expect(container.hasChildNodes()).toBe(false);
});
