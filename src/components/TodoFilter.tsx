import React, { useEffect } from 'react';
import classNames from 'classnames';
import { connect } from '../store/connect';
import { $app } from '../store/actions/app';
import { $todos } from '../store/actions/todos';
import { TodoState } from '../lib/TodoState';
import { unreachable } from '../lib/unreachable';

export const TodoFilter = connect(
  ({ todos, filters }) => {
    return {
      currentTodoState: filters.todoState,
      hasCompletedTodos: todos.some(t => t.completed),
    };
  },

  function TodoFilter({ dispatch, currentTodoState, hasCompletedTodos }) {
    useHashChangeEvent(hash => {
      dispatch($app.HashChanged(hash));
    });

    return (
      <>
        <ul className="filters">
          {TodoState.values().map(todoState => (
            <li key={todoState}>
              <a
                className={classNames({ selected: todoState === currentTodoState })}
                href={TodoState.toHash(todoState)}
                data-value={todoState}
              >
                {todoStateLabel(todoState)}
              </a>
            </li>
          ))}
        </ul>
        {hasCompletedTodos && (
          <button
            className="clear-completed"
            onClick={() => dispatch($todos.ClearCompleted())}
          >
            Clear completed
          </button>
        )}
      </>
    );
  }
);

const todoStateLabel = (todoState: TodoState.Value): string => {
  switch (todoState) {
    case TodoState.Value.All:
      return 'All';
    case TodoState.Value.Active:
      return 'Active';
    case TodoState.Value.Completed:
      return 'Completed';
    default:
      return unreachable(todoState);
  }
};

const useHashChangeEvent = (listener: (hash: string) => void) => {
  useEffect(() => {
    const f = () => listener(location.hash);
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
};
