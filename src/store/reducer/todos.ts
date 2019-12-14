import { defineReducer, on } from 'redy';
import { $todos } from '../actions/todos';
import { Todos } from '../../lib/Todos';

export const reduceTodos = defineReducer(Todos.init(), [
  on($todos.Add, (todos, { id, title }) => {
    const newTodo = Todos.create(id, title);
    return Todos.add(todos, newTodo);
  }),

  on($todos.Remove, (todos, { id }) => {
    return Todos.remove(todos, [id]);
  }),

  on($todos.ChangeTitle, (todos, { id, title }) => {
    const todo = Todos.find(todos, id);
    const nextTodo = { ...todo, title };
    return Todos.replace(todos, [nextTodo]);
  }),

  on($todos.ToggleCompleted, (todos, { id, completed }) => {
    const todo = Todos.find(todos, id);
    return Todos.replace(todos, [{ ...todo, completed }]);
  }),

  on($todos.ToggleCompletedAll, (todos, { completed }) => {
    const toggledTodos = todos.map(todo => ({ ...todo, completed }));
    return Todos.replace(todos, toggledTodos);
  }),

  on($todos.ClearCompleted, todos => {
    const completedIds = todos.filter(todo => todo.completed).map(t => t.id);
    return Todos.remove(todos, completedIds);
  }),
]);
