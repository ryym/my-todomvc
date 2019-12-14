import React, { useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import classNames from 'classnames';
import { $todos } from '../store/actions/todos';
import { ENTER } from '../lib/KeyCode';
import { Todo } from '../lib/Todos';

export type EditState = { type: 'EditStart'; id: number } | { type: 'EditEnd' };

export interface Props {
  readonly dispatch: Dispatch;
  readonly todo: Todo;
  readonly editable?: boolean;
  readonly onEditStateChange: (editState: EditState) => void;
}

export const TodoItem = ({
  dispatch,
  todo,
  editable = false,
  onEditStateChange,
}: Props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      titleInputRef.current!.focus();
    }
  }, [editable]);

  const finishTitleEdit = () => {
    const title = titleInputRef.current!.value;
    dispatch($todos.ChangeTitle(todo.id, title));
    onEditStateChange({ type: 'EditEnd' });
  };

  return (
    <li className={classNames({ editing: editable, completed: todo.completed })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={event => {
            dispatch($todos.ToggleCompleted(todo.id, event.currentTarget.checked));
          }}
        />
        <label
          onDoubleClick={() => {
            onEditStateChange({ type: 'EditStart', id: todo.id });
          }}
        >
          {todo.title}
        </label>
        <button
          className="destroy"
          onClick={() => dispatch($todos.Remove(todo.id))}
        ></button>
      </div>
      <input
        ref={titleInputRef}
        type="text"
        defaultValue={todo.title}
        className="edit"
        onBlur={finishTitleEdit}
        onKeyUp={event => {
          if (editable && event.keyCode === ENTER) {
            finishTitleEdit();
          }
        }}
      />
    </li>
  );
};
