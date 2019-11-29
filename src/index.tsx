import './styles.css';

export const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greet('world'));
