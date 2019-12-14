import { defineActions } from 'redy';

export const $app = defineActions('app', {
  HashChanged: (hash: string) => hash,
});
