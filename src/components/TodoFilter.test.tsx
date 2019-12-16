import React from 'react';
import { Provider } from 'react-redux';
import { act, Simulate } from 'react-dom/test-utils';
import { spy } from 'sinon';
import { initState } from '../store/state';
import { $todos } from '../store/actions/todos';
import { TodoState } from '../lib/TodoState';
import { mockStore } from './__testlib__/redux';
import { renderSnapshot, render } from './__testlib__/react';
import { TodoFilter } from './TodoFilter';

it('matches snapshot', () => {
  const store = mockStore(initState());
  const tree = renderSnapshot(
    <Provider store={store}>
      <TodoFilter />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});

it('marks selected todo state filter', () => {
  const store = mockStore({
    ...initState(),
    filters: { todoState: TodoState.Value.Active },
  });
  const container = render(
    <Provider store={store}>
      <TodoFilter />
    </Provider>
  );

  const selectedLink = container.querySelector('a.selected') as HTMLLinkElement;
  expect(selectedLink).not.toBeNull();
  expect(selectedLink.dataset.value).toEqual(TodoState.Value.Active);
});

it('does not show clear-completed button if there are no completed todos', () => {
  const store = mockStore({
    ...initState(),
    todos: [{ id: 1, title: 'foo', completed: false }],
  });
  const container = render(
    <Provider store={store}>
      <TodoFilter />
    </Provider>
  );

  const button = container.querySelector('.clear-completed');
  expect(button).toBeNull();
});

it('clears completed todos on button click', () => {
  const dispatch = spy();
  const store = mockStore(
    {
      ...initState(),
      todos: [{ id: 1, title: 'foo', completed: true }],
    },
    dispatch
  );

  const container = render(
    <Provider store={store}>
      <TodoFilter />
    </Provider>
  );

  const button = container.querySelector('.clear-completed')!;
  act(() => {
    Simulate.click(button);
  });

  expect(dispatch.args).toEqual([[$todos.ClearCompleted()]]);
});
