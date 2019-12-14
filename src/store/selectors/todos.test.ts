import { selectFilteredTodos } from './todos';
import { State } from '../state';
import { Todo } from '../../lib/Todos';
import { TodoState } from '../../lib/TodoState';

describe('selectFilteredTodos', () => {
  const todo = (id: number, completed = false): Todo => ({
    id,
    title: `todo${id}`,
    completed,
  });

  const cases: {
    title: string;
    state: State;
    want: number[];
  }[] = [
    {
      title: 'all todos',
      state: {
        todos: [todo(2), todo(3, true), todo(8, true), todo(11)],
        filters: { todoState: TodoState.Value.All },
      },
      want: [2, 3, 8, 11],
    },
    {
      title: 'active todos',
      state: {
        todos: [todo(2), todo(3, true), todo(8, true), todo(11)],
        filters: { todoState: TodoState.Value.Active },
      },
      want: [2, 11],
    },
    {
      title: 'completed todos',
      state: {
        todos: [todo(2), todo(3, true), todo(8, true), todo(11)],
        filters: { todoState: TodoState.Value.Completed },
      },
      want: [3, 8],
    },
  ];

  cases.forEach(cs => {
    it(cs.title, () => {
      const got = selectFilteredTodos(cs.state).map(t => t.id);
      expect(got).toEqual(cs.want);
    });
  });
});
