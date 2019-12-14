import React, { useState } from 'react';
import { connect } from '../store/connect';
import { selectFilteredTodos } from '../store/selectors/todos';
import { TodoItem, EditState } from './TodoItem';

export const TodoList = connect(
  state => ({
    todos: selectFilteredTodos(state),
  }),

  function TodoList({ dispatch, todos }) {
    const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

    const handleEditStateChange = (state: EditState) => {
      switch (state.type) {
        case 'EditStart':
          setEditedTodoId(state.id);
          break;
        case 'EditEnd':
          setEditedTodoId(null);
          break;
      }
    };

    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editable={editedTodoId === todo.id}
            onEditStateChange={handleEditStateChange}
            dispatch={dispatch}
          />
        ))}
      </ul>
    );
  }
);
