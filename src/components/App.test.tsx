import React from 'react';
import { Provider } from 'react-redux';
import { render } from './__testlib__/react';
import { mockStore } from './__testlib__/redux';
import { App } from './App';
import { initState } from '../store/state';

it('renders without problem', () => {
  const store = mockStore(initState());
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
