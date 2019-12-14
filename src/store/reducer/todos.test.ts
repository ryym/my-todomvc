import { reduceTodos } from './todos';
import { $todos } from '../actions/todos';
import { Todos } from '../../lib/Todos';

it('has proper initial state', () => {
  const initialTodos = reduceTodos(undefined, { type: '__' });
  expect(initialTodos).toEqual([]);
});

it('adds new todo', () => {
  const init: Todos = [];
  const want = [{ id: 1, title: 'Buy Pokemon', completed: false }];
  const got = reduceTodos(init, $todos.Add(1, 'Buy Pokemon'));

  expect(got).toEqual(want);
  expect(got).not.toBe(init);
});

it('removes todo', () => {
  const init: Todos = [
    { id: 1, title: 'Buy Pokemon', completed: false },
    { id: 2, title: 'Say hello', completed: false },
  ];
  const want = [{ id: 2, title: 'Say hello', completed: false }];
  const got = reduceTodos(init, $todos.Remove(1));

  expect(got).toEqual(want);
  expect(got).not.toBe(init);
});
