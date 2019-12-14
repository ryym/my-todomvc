import { defineReducer, on } from 'redy';
import { TodoState } from '../../lib/TodoState';
import { initFilters } from '../state';
import { $app } from '../actions/app';

export const reduceFilters = defineReducer(initFilters(), [
  on($app.HashChanged, (filters, hash) => {
    const todoState = TodoState.fromHash(hash);
    return { ...filters, todoState };
  }),
]);
