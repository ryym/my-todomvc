import { State } from '../state';
import { Todo } from '../../lib/Todos';
import { TodoState } from '../../lib/TodoState';
import { unreachable } from '../../lib/unreachable';

export const selectFilteredTodos = ({ todos, filters }: State): Todo[] => {
  switch (filters.todoState) {
    case TodoState.Value.All:
      return todos;

    case TodoState.Value.Active:
      return todos.filter(t => !t.completed);

    case TodoState.Value.Completed:
      return todos.filter(t => t.completed);

    default:
      return unreachable(filters.todoState);
  }
};
