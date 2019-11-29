import React from 'react';
import { Info } from './Info';
import { TodoList } from './TodoList';

export const App = () => {
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
          />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> items left
          </span>
          <ul className="filters">
            <li>
              <a className="selected" href="#/">
                All
              </a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
      <footer>
        <Info />
      </footer>
    </div>
  );
};
