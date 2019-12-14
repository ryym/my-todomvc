import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import classNames from 'classnames';
import { $todos } from '../store/actions/todos';
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
  const { inputRef: titleInputRef, startEdit, finishEdit, applyEdit } = useTitleEdit({
    dispatch,
    todo,
    editable,
    onEditStateChange,
  });

  const escKeyPressed = useRef<boolean>(false);

  const handleTitleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!editable) {
      return;
    }
    switch (event.key) {
      case 'Enter':
        applyEdit();
        break;
      case 'Esc':
      case 'Escape':
        escKeyPressed.current = true;
        break;
    }
  };

  const handleTitleBlur = () => {
    // Delay the process to ensure that it runs after the keydown event handler.
    // This is because the blur and keydown events could runs in the different order
    // by the pressed key (at least in my environment).
    //   - When you exit by Tab - keydown -> blur
    //   - When you exit by Escape - blur -> keydown
    // And according to the spec, the changes made should be discarded
    // only when a user leave the editing mode by Escape.
    // (https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality)
    setTimeout(() => {
      if (escKeyPressed.current) {
        finishEdit();
        escKeyPressed.current = false;
      } else {
        applyEdit();
      }
    });
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
        <label onDoubleClick={startEdit}>{todo.title}</label>
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
        onKeyDown={handleTitleKeyDown}
        onBlur={handleTitleBlur}
      />
    </li>
  );
};

const useTitleEdit = ({ dispatch, todo, editable, onEditStateChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      inputRef.current!.focus();
    }
  }, [editable]);

  const startEdit = () => {
    onEditStateChange({ type: 'EditStart', id: todo.id });
  };

  const finishEdit = () => {
    onEditStateChange({ type: 'EditEnd' });
  };

  const applyEdit = () => {
    const title = inputRef.current!.value.trim();
    if (title.length === 0) {
      dispatch($todos.Remove(todo.id));
    } else {
      dispatch($todos.ChangeTitle(todo.id, title));
    }
    finishEdit();
  };

  return { inputRef, startEdit, finishEdit, applyEdit };
};
