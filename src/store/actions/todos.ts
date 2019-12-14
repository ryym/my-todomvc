import { defineActions, effect } from 'redy';

let _globalTodoId = 1;

export const $todos = defineActions('todos', {
  AddNew: effect((title: string) => async dispatch => {
    if (title != null) {
      title = title.trim();
      if (title.length > 0) {
        dispatch($todos.Add(_globalTodoId++, title));
      }
    }
  }),

  Add: (id: number, title: string) => ({ id, title }),

  Remove: (id: number) => ({ id }),

  ChangeTitle: (id: number, title: string) => ({ id, title }),

  ToggleCompleted: (id: number, completed: boolean) => ({ id, completed }),

  ToggleCompletedAll: (completed: boolean) => ({ completed }),

  ClearCompleted: () => {},
});
