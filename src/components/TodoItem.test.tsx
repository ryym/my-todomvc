import React from 'react';
import { SinonSpy, spy } from 'sinon';
import { act, Simulate } from 'react-dom/test-utils';
import { renderSnapshot, render, getByTestId } from './__testlib__/react';
import { Todo } from '../lib/Todos';
import { TodoItem } from './TodoItem';
import { $todos } from '../store/actions/todos';

it('matches snapshot', () => {
  const todo: Todo = { id: 1, title: 'todo1', completed: false };
  const tree = renderSnapshot(
    <TodoItem todo={todo} dispatch={spy()} onEditStateChange={spy()} />
  );
  expect(tree).toMatchSnapshot();
});

it('applies edited title on Enter', () => {
  const dispatch = spy();
  const onEditStateChange = spy();
  const todo: Todo = { id: 1, title: 'original title', completed: false };

  const container = render(
    <TodoItem
      editable
      todo={todo}
      dispatch={dispatch}
      onEditStateChange={onEditStateChange}
    />
  );

  const input = getByTestId(container, 'title-edit') as HTMLInputElement;
  act(() => {
    input.value = 'edited title';
    Simulate.change(input);
  });

  act(() => {
    Simulate.keyDown(input, { key: 'Enter' });
  });

  expect(dispatch.args).toEqual([[$todos.ChangeTitle(1, 'edited title')]]);
  expect(onEditStateChange.args).toEqual([[{ type: 'EditEnd' }]]);
});

it('discards edited title on Escape', async () => {
  const dispatch = spy();
  const onEditStateChange = spy();
  const todo: Todo = { id: 1, title: 'original title', completed: false };

  const container = render(
    <TodoItem
      editable
      todo={todo}
      dispatch={dispatch}
      onEditStateChange={onEditStateChange}
    />
  );

  const input = getByTestId(container, 'title-edit') as HTMLInputElement;
  act(() => {
    input.value = 'edited title';
    Simulate.change(input);
  });

  act(() => {
    Simulate.keyDown(input, { key: 'Escape' });
  });

  expect(dispatch.args).toEqual([]);
  expect(onEditStateChange.args).toEqual([[{ type: 'EditEnd' }]]);
});

it('applies edited title on blur', async () => {
  const dispatch = spy();
  const onEditStateChange = spy();
  const todo: Todo = { id: 1, title: 'original title', completed: false };

  const container = render(
    <TodoItem
      editable
      todo={todo}
      dispatch={dispatch}
      onEditStateChange={onEditStateChange}
    />
  );

  const input = getByTestId(container, 'title-edit') as HTMLInputElement;
  act(() => {
    input.value = 'edited title';
    Simulate.change(input);
  });

  act(() => {
    Simulate.blur(input);
  });
  await waitForFirstCall(onEditStateChange);

  expect(dispatch.args).toEqual([[$todos.ChangeTitle(1, 'edited title')]]);
});

const waitForFirstCall = (spy: SinonSpy, timeout: number = 1000): Promise<void> => {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsed = 0;
    const check = () => {
      if (spy.called) {
        resolve();
      } else if (elapsed < timeout) {
        elapsed += interval;
        setTimeout(check, interval);
      } else {
        reject(new Error(`Sinon function has not been called during ${elapsed}ms`));
      }
    };
    check();
  });
};
