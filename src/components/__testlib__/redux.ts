import { Dispatch, Store, createStore } from 'redux';
import { State } from '../../store/state';

export function mockStore<S = State>(initialState: S, dispatch?: Dispatch): Store<S> {
  const noopReducer = (state: any) => state;
  let mockStore = createStore(noopReducer, initialState);
  if (dispatch) {
    mockStore = { ...mockStore, dispatch };
  }
  return mockStore;
}
