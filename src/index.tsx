import * as React from 'react';
import { render } from 'react-dom';

import 'todomvc-app-css/index.css';

const App = () => (
  <div>
    <h1>Hello world from React</h1>
  </div>
);

render(<App />, document.getElementById('root'));
