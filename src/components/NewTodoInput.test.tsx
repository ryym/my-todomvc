import React from 'react';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import { act, Simulate } from 'react-dom/test-utils';
import { renderSnapshot, render, getByTestId } from './__testlib__/react';
import { mockStore } from './__testlib__/redux';
import { initState } from '../store/state';
import { $todos } from '../store/actions/todos';
import { NewTodoInput } from './NewTodoInput';

it('matches snapshot', () => {
  const store = mockStore(initState());
  const tree = renderSnapshot(
    <Provider store={store}>
      <NewTodoInput />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});

it('adds new todo when Enter is pressed', () => {
  const dispatch = spy();
  const container = render(<NewTodoInput.WrappedComponent dispatch={dispatch} />);
  const input = getByTestId(container, 'new-todo') as HTMLInputElement;

  act(() => {
    input.value = 'Buy Switch';
    Simulate.change(input);
  });

  act(() => {
    Simulate.keyDown(input, { key: 'Enter' });
  });

  expect(dispatch.args).toEqual([[$todos.AddNew('Buy Switch')]]);
});
