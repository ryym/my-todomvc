import { combineReducers, Reducer } from 'redux';
import { reduceTodos } from './todos';
import { reduceFilters } from './filters';
import { State } from '../state';

export const createReducer = (): Reducer<State> => {
  return combineReducers({
    todos: reduceTodos,
    filters: reduceFilters,
  });
};
