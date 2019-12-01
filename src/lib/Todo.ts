// XXX
let _globalId = 1;

export class Todo {
  static create(title: string, done: boolean = false) {
    return new Todo(_globalId++, title, done);
  }

  // XXX: Should be immutable?
  constructor(readonly id: number, public title: string, public done: boolean) {}
}
