export interface Todo {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
}

export type Todos = Todo[];

export namespace Todos {
  export const init = (): Todos => {
    return [];
  };

  const _find = (todos: Todos, id: number): [Todo, number] => {
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      if (todo.id === id) {
        return [todo, i];
      }
    }
    throw new Error(`Todo not found (id: ${id})`);
  };

  export const find = (todos: Todos, id: number): Todo => {
    const [todo] = _find(todos, id);
    return todo;
  };

  export const create = (id: number, title: string): Todo => {
    return { id, title, completed: false };
  };

  export const add = (todos: Todos, newTodo: Todo): Todos => {
    if (todos.filter(t => t.id === newTodo.id).length > 0) {
      throw new Error(`Todo (id: ${newTodo.id}) already exists`);
    }
    return [...todos, newTodo];
  };

  export const replace = (todos: Todos, updatedTodos: Todo[]): Todos => {
    todos = [...todos];
    updatedTodos.forEach(todo => {
      const [, idx] = _find(todos, todo.id);
      todos[idx] = todo;
    });
    return todos;
  };

  export const remove = (todos: Todos, ids: number[]): Todos => {
    return todos.filter(t => ids.indexOf(t.id) === -1);
  };
}
