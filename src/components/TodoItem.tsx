import React, { KeyboardEvent, useState, useEffect, useRef } from 'react';
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
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(todo.title);

  useEffect(() => {
    if (editable) {
      titleInputRef.current!.focus();
    }
  }, [editable]);

  const startEdit = () => {
    onEditStateChange({ type: 'EditStart', id: todo.id });
  };

  const finishEdit = () => {
    onEditStateChange({ type: 'EditEnd' });
  };

  const applyEdit = () => {
    if (title.length === 0) {
      dispatch($todos.Remove(todo.id));
    } else {
      dispatch($todos.ChangeTitle(todo.id, title));
    }
    finishEdit();
  };

  const titleEventHandlers = useTitleEventHandlers({
    editable,
    applyEdit,
    discardEdit: () => {
      setTitle(todo.title);
      finishEdit();
    },
  });

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
        <label data-testid="title-label" onDoubleClick={startEdit}>
          {todo.title}
        </label>
        <button
          className="destroy"
          onClick={() => dispatch($todos.Remove(todo.id))}
        ></button>
      </div>
      <input
        data-testid="title-edit"
        ref={titleInputRef}
        type="text"
        value={title}
        className="edit"
        onChange={event => setTitle(event.currentTarget.value)}
        onKeyDown={titleEventHandlers.keyDown}
        onBlur={titleEventHandlers.blur}
      />
    </li>
  );
};

const useTitleEventHandlers = ({
  editable,
  applyEdit,
  discardEdit,
}: {
  editable: boolean;
  applyEdit: () => void;
  discardEdit: () => void;
}) => {
  const escKeyPressed = useRef<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!editable) {
      return;
    }
    switch (event.key) {
      case 'Enter':
        applyEdit();
        break;
      case 'Esc':
      case 'Escape':
        // Call discardEdit here though we call it on blur too.
        // This ensures the item quits editable mode even if
        // some browser does not fire a blur event on Escape.
        discardEdit();
        escKeyPressed.current = true;
        break;
    }
  };

  const handleBlur = () => {
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
        discardEdit();
        escKeyPressed.current = false;
      } else {
        applyEdit();
      }
    });
  };

  return { keyDown: handleKeyDown, blur: handleBlur };
};
