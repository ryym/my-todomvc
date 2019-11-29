import 'todomvc-app-css/index.css';

export const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greet('world'));
