import React from 'react';
import { connect } from '../store/connect';
import { $todos } from '../store/actions/todos';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export const TodoListWithFilter = connect(
  ({ todos }) => {
    return {
      hasTodos: todos.length > 0,
      isAllCompleted: todos.every(t => t.completed),
      activeCount: todos.filter(t => !t.completed).length,
    };
  },

  function TodoListWithFilter({ dispatch, hasTodos, isAllCompleted, activeCount }) {
    if (!hasTodos) {
      return null;
    }
    return (
      <>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={isAllCompleted}
            onChange={event => {
              dispatch($todos.ToggleCompletedAll(event.currentTarget.checked));
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeCount}</strong>
            {activeCount === 1 ? 'item' : 'items'} left
          </span>
          <TodoFilter />
        </footer>
      </>
    );
  }
);
