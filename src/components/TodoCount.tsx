import React from 'react';
import { Todo } from '../lib/Todo';

export type Props = {
  todos: Todo[];
};

export const TodoCount = ({ todos }: Props) => {
  const activeCount = todos.filter(t => !t.done).length;
  const itemWord = activeCount === 1 ? 'item' : 'items';
  return (
    <span className="todo-count">
      <strong>{activeCount}</strong> {itemWord} left
    </span>
  );
};
