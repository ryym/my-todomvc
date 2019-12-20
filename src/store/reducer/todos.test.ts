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

it('toggles completed of all todos', () => {
  const random: Todos = [
    { id: 1, title: 'a', completed: false },
    { id: 2, title: 'b', completed: true },
    { id: 3, title: 'c', completed: false },
  ];

  const allCompleted = [
    { id: 1, title: 'a', completed: true },
    { id: 2, title: 'b', completed: true },
    { id: 3, title: 'c', completed: true },
  ];

  const allUncompleted = [
    { id: 1, title: 'a', completed: false },
    { id: 2, title: 'b', completed: false },
    { id: 3, title: 'c', completed: false },
  ];

  const toggleAll = (todos: Todos, completed: boolean) => {
    return reduceTodos(todos, $todos.ToggleCompletedAll(completed));
  };

  expect(toggleAll(random, true)).toEqual(allCompleted);
  expect(toggleAll(allUncompleted, false)).toEqual(allUncompleted);

  expect(toggleAll(random, false)).toEqual(allUncompleted);
  expect(toggleAll(allCompleted, false)).toEqual(allUncompleted);
});
