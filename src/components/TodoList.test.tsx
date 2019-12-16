import React from 'react';
import { Provider } from 'react-redux';
import { TodoList } from './TodoList';
import { initState } from '../store/state';
import { mockStore } from './__testlib__/redux';
import { renderSnapshot } from './__testlib__/react';

it('matches snapshot', () => {
  const store = mockStore({
    ...initState(),
    todos: [{ id: 1, title: 'hello', completed: false }],
  });
  const tree = renderSnapshot(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});
