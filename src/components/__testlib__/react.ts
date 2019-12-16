import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

// Though we used @testing-library/react first, it looks like it has a bug
// about the change event simulation (https://github.com/testing-library/react-testing-library/issues/359).
// And the official react-dom/test-utils is useful enough.

export const render = (element: ReactElement<any>) => {
  const container = document.createElement('div');
  act(() => {
    ReactDOM.render(element, container);
  });
  return container;
};

export const getByTestId = (container: HTMLElement, testId: string): HTMLElement => {
  const element = container.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
  if (element == null) {
    throw new Error(`Test ID not found: ${testId}`);
  }
  return element;
};

export const renderSnapshot = (element: ReactElement<any>) => {
  return renderer.create(element).toJSON();
};
