import React from 'react';
import { NewTodoInput } from './NewTodoInput';
import { TodoListWithFilter } from './TodoListWithFilter';

export const App = () => {
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodoInput />
        </header>
        <TodoListWithFilter />
      </section>
      <footer>
        <Info />
      </footer>
    </div>
  );
};

const Info = () => {
  return (
    <div className="info">
      <p>Double-click to edit a todo</p>
      <p>
        Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
      </p>
      <p>
        Created by <a href="http://todomvc.com">you</a>
      </p>
      <p>
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </div>
  );
};
