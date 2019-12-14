import { spy } from 'sinon';
import { $todos } from './todos';

describe('AddNew', () => {
  it('adds new todo with generating ID', async () => {
    const addNew = $todos.AddNew.using({ genId: () => 10 });
    const dispatch = spy();
    await addNew('new-todo')(dispatch, spy(), undefined);

    expect(dispatch.args).toEqual([[$todos.Add(10, 'new-todo')]]);
  });
});
