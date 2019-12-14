import { Todos } from '../lib/Todos';
import { TodoState } from '../lib/TodoState';

export interface State {
  readonly todos: TodosState;
  readonly filters: FiltersState;
}

export type TodosState = Todos;

export interface FiltersState {
  readonly todoState: TodoState.Value;
}

export const initFilters = (): FiltersState => ({
  todoState: TodoState.Value.All,
});
