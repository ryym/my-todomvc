import { SFC } from 'react';
import { Dispatch } from 'redux';
import { connect as reduxConnect } from 'react-redux';
import { State } from './state';

export type WithDispatch<P extends {}> = P & { dispatch: Dispatch };

export function connect<WrapperProps extends {}, Props extends {} = {}>(
  mapStateToProps: (state: State, props: WrapperProps) => Props,
  wrappedComponent: SFC<WithDispatch<Props>>
): SFC<WrapperProps> {
  return (reduxConnect as any)(mapStateToProps)(wrappedComponent);
}
