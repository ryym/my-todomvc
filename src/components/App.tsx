import React, { KeyboardEvent, ChangeEvent, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Info } from './Info';
import { TodoList } from './TodoList';
import { TodoCount } from './TodoCount';
import { Todo } from '../lib/Todo';

const KEY_CODE_ENTER = 13;

enum Visibility {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

const filterTodos = (todos: Todo[], visibility: Visibility): Todo[] => {
  switch (visibility) {
    case Visibility.ALL:
      return todos;
    case Visibility.ACTIVE:
      return todos.filter(t => !t.done);
    case Visibility.COMPLETED:
      return todos.filter(t => t.done);
    default:
      throw new Error(`Unknown visibility: ${visibility}`);
  }
};

const locationToVisibility = (hash: string): Visibility => {
  switch (hash) {
    case '#/active':
      return Visibility.ACTIVE;
    case '#/completed':
      return Visibility.COMPLETED;
    default:
      return Visibility.ALL;
  }
};

export const App = () => {
  const [newTodoInput, setNewTodoInput] = useState('');

  const [todos, setTodos] = useState([] as Todo[]);

  const [visibility, setVisibility] = useState(() => locationToVisibility(location.hash));

  const shownTodos = filterTodos(todos, visibility);

  const handleNewTodoKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode !== KEY_CODE_ENTER) {
      return;
    }
    const newTodoItem = Todo.create(newTodoInput);
    setTodos(todos.concat(newTodoItem));
    setNewTodoInput('');
  };

  const handleTodoItemCheck = (todo: Todo, checked: boolean) => {
    const idx = todos.indexOf(todo);
    if (idx === -1) {
      throw new Error(`Unknown todo item is checked ${todo.id}:${todo.title}`);
    }
    todo.done = checked;

    // React does not re-render for same array instances.
    const nextTodos = [...todos];
    nextTodos[idx] = todo;
    setTodos(nextTodos);
  };

  const deleteTodo = (todo: Todo) => {
    const nextTodos = todos.filter(t => t !== todo);
    setTodos(nextTodos);
  };

  const handleItemDeleteClick = deleteTodo;

  const handleItemTitleChange = (todo: Todo, newTitle: string) => {
    const idx = todos.indexOf(todo);
    if (idx === -1) {
      throw new Error(`Unknown todo title is edited ${todo.id}:${todo.title}`);
    }
    newTitle = newTitle.trim();
    if (newTitle.length === 0) {
      deleteTodo(todo);
    } else {
      todo.title = newTitle;

      // React does not re-render for same array instances.
      const nextTodos = [...todos];
      nextTodos[idx] = todo;
      setTodos(nextTodos);
    }
  };

  const handleToggleAllCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTodos = todos.map(t => {
      t.done = event.currentTarget.checked;
      return t;
    });
    setTodos(nextTodos);
  };

  const handleClearCompletedClick = () => {
    const nextTodos = todos.filter(t => !t.done);
    setTodos(nextTodos);
  };

  useEffect(() => {
    const listenHashChange = () => {
      const nextVisibility = locationToVisibility(location.hash);
      setVisibility(nextVisibility);
    };
    window.addEventListener('hashchange', listenHashChange);

    return () => window.removeEventListener('hashchange', listenHashChange);
  }, []);

  const visibilityFilters = [
    {
      label: 'All',
      value: Visibility.ALL,
      href: '#/',
    },
    {
      label: 'Active',
      value: Visibility.ACTIVE,
      href: '#/active',
    },
    {
      label: 'Completed',
      value: Visibility.COMPLETED,
      href: '#/completed',
    },
  ];

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTodoInput}
            onChange={event => setNewTodoInput(event.currentTarget.value)}
            onKeyUp={handleNewTodoKeyUp}
          />
        </header>
        {todos.length > 0 && (
          <>
            <section className="main">
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={handleToggleAllCheck}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <TodoList
                todos={shownTodos}
                onItemToggleState={handleTodoItemCheck}
                onItemDelete={handleItemDeleteClick}
                onItemTitleChange={handleItemTitleChange}
              />
            </section>
            <footer className="footer">
              <TodoCount todos={todos} />
              <ul className="filters">
                {visibilityFilters.map(item => (
                  <li key={item.value}>
                    <a
                      className={classNames({ selected: item.value === visibility })}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {todos.filter(t => t.done).length > 0 && (
                <button className="clear-completed" onClick={handleClearCompletedClick}>
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </section>
      <footer>
        <Info />
      </footer>
    </div>
  );
};
