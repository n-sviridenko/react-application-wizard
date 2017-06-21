import { fromJS } from 'immutable';

import { merge } from 'store/actions/entities';
import reducer, { getRoot } from './entities';

describe('entities reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});
    const expected = fromJS({});
    expect(state).toEqual(expected);
  });

  it('merges entities', () => {
    const entities = { test: {} };
    const state = reducer(undefined, merge(entities)).toJS();
    expect(state).toEqual(entities);
  });

  it('should select the root state', () => {
    const state = fromJS({});
    const globalState = fromJS({ entities: state });
    expect(getRoot(globalState)).toEqual(state);
  });
});
