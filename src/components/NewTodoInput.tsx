import React, { useState } from 'react';
import { connect } from '../store/connect';
import { $todos } from '../store/actions/todos';

export const NewTodoInput = connect(
  () => ({}),

  function NewTodoInput({ dispatch }) {
    const [title, setTitle] = useState('');

    return (
      <input
        data-testid="new-todo"
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={event => setTitle(event.currentTarget.value)}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            dispatch($todos.AddNew(title));
            setTitle('');
          }
        }}
      />
    );
  }
);
