import React, { useState } from 'react';
import { ENTER } from '../lib/KeyCode';
import { connect } from '../store/connect';
import { $todos } from '../store/actions/todos';

export const NewTodoInput = connect(
  () => ({}),

  function NewTodoInput({ dispatch }) {
    const [title, setTitle] = useState('');

    return (
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={event => setTitle(event.currentTarget.value)}
        onKeyUp={event => {
          if (event.keyCode === ENTER) {
            dispatch($todos.AddNew(title));
            setTitle('');
          }
        }}
      />
    );
  }
);
