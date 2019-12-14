export namespace TodoState {
  // Todo state for filtering.
  export enum Value {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
  }

  export enum Hash {
    All = '#/',
    Active = '#/active',
    Completed = '#/completed',
  }

  export const values = (): TodoState.Value[] => {
    return Object.values(TodoState.Value) as TodoState.Value[];
  };

  export const toHash = (state: TodoState.Value): string => {
    return TodoState.Hash[state];
  };

  export const fromHash = (hash: string): TodoState.Value => {
    const hashKeys = Object.keys(TodoState.Hash) as (keyof typeof TodoState.Hash)[];
    for (let key of hashKeys) {
      if (TodoState.Hash[key] === hash) {
        return TodoState.Value[key];
      }
    }
    return TodoState.Value.All;
  };
}
