import React, { KeyboardEvent, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../lib/Todo';

export type Props = {
  todos: Todo[];
  onItemToggleState: (todo: Todo, checked: boolean) => void;
  onItemDelete: (todo: Todo) => void;
  onItemTitleChange: (todo: Todo, newTitle: string) => void;
};

export const TodoList = ({
  todos,
  onItemToggleState,
  onItemDelete,
  onItemTitleChange,
}: Props) => {
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

  const handleTitleChangeStart = (todo: Todo) => {
    setEditedTodoId(todo.id);
  };

  const handleItemTitleChange = (todo: Todo, newTitle: string) => {
    onItemTitleChange(todo, newTitle);
    setEditedTodoId(null);
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleState={onItemToggleState}
          onDelete={onItemDelete}
          onTitleChangeStart={handleTitleChangeStart}
          onTitleChange={newTitle => handleItemTitleChange(todo, newTitle)}
          editable={editedTodoId === todo.id}
        />
      ))}
    </ul>
  );
};

type ItemProps = {
  todo: Todo;
  onToggleState: (todo: Todo, checked: boolean) => void;
  onDelete: (todo: Todo) => void;
  onTitleChangeStart: (todo: Todo) => void;
  onTitleChange: (newTitle: string) => void;
  editable?: boolean;
};

const TodoItem = ({
  todo,
  onToggleState,
  onDelete,
  onTitleChangeStart,
  onTitleChange,
  editable = false,
}: ItemProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  // XXX: Maybe unnecessary
  // const [title, setTitle] = useState(todo.title);

  useEffect(() => {
    if (editable) {
      titleInputRef.current!.focus();
    }
  }, [editable]);

  const finishTitleEdit = () => {
    onTitleChange(titleInputRef.current!.value);
  };

  const handleTitleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!editable) {
      return;
    }
    if (event.keyCode === 13) {
      finishTitleEdit();
    }
  };

  return (
    <li className={classNames({ editing: editable, completed: todo.done })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={event => onToggleState(todo, event.currentTarget.checked)}
        />
        <label onDoubleClick={() => onTitleChangeStart(todo)}>{todo.title}</label>
        <button className="destroy" onClick={() => onDelete(todo)}></button>
      </div>
      <input
        ref={titleInputRef}
        type="text"
        defaultValue={todo.title}
        className="edit"
        onKeyUp={handleTitleKeyUp}
        onBlur={() => finishTitleEdit()}
      />
    </li>
  );
};
