import { createStore, applyMiddleware, compose, Store } from 'redux';
import { redyMiddleware } from 'redy';
import logger from 'redux-logger';
import { createReducer } from './reducer';
import { State } from './state';

// https://github.com/zalmoxisus/redux-devtools-extension#installation
const composeEnhancers: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (initialState: Partial<State>): Store<State> => {
  const reducer = createReducer();
  const enhancer = composeEnhancers(applyMiddleware(logger, redyMiddleware()));
  return createStore(reducer, initialState, enhancer);
};
