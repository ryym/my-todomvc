import { defineActions, effectUsing } from 'redy';
import { Thunk } from '../thunk';

// const makeIdGenerator = () => {
//   let _id = 1;
//   return () => _id++;
// };

export const $todos = defineActions('todos', {
  AddNew: effectUsing(
    () => ({ genId: () => Date.now() }),
    d => (title: string): Thunk => async dispatch => {
      if (title != null) {
        title = title.trim();
        if (title.length > 0) {
          dispatch($todos.Add(d.genId(), title));
        }
      }
    }
  ),

  Add: (id: number, title: string) => ({ id, title }),

  Remove: (id: number) => ({ id }),

  ChangeTitle: (id: number, title: string) => ({ id, title }),

  ToggleCompleted: (id: number, completed: boolean) => ({ id, completed }),

  ToggleCompletedAll: (completed: boolean) => ({ completed }),

  ClearCompleted: () => {},
});
