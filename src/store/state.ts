import { Todos } from '../lib/Todos';
import { TodoState } from '../lib/TodoState';

export interface State {
  readonly todos: TodosState;
  readonly filters: FiltersState;
}

export const initState = (): State => {
  return {
    todos: initTodosState(),
    filters: initFilters(),
  };
};

export type TodosState = Todos;

export const initTodosState = Todos.init;

export interface FiltersState {
  readonly todoState: TodoState.Value;
}

export const initFilters = (): FiltersState => ({
  todoState: TodoState.Value.All,
});
