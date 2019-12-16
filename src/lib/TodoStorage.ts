import { Store } from 'redux';
import { State } from '../store/state';
import { Todo } from './Todos';

const STORAGE_KEY = 'todomvc/Todos';

export class TodoStorage {
  constructor(private readonly storage: Storage) {}

  load(): Todo[] | null {
    const value = this.storage.getItem(STORAGE_KEY);
    return value && JSON.parse(value);
  }

  saveOnChange(store: Store<State>) {
    let prevTodos = store.getState().todos;
    store.subscribe(() => {
      const { todos } = store.getState();
      if (todos !== prevTodos) {
        this.storage.setItem(STORAGE_KEY, JSON.stringify(todos));
        prevTodos = todos;
      }
    });
  }
}
