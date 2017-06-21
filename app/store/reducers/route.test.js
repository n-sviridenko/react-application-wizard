import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import reducer, { getRoot, getRootAsJS } from './route';

describe('route reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});
    const expected = fromJS({ locationBeforeTransitions: null });
    expect(state).toEqual(expected);
  });

  it('changes the location', () => {
    const state = reducer(undefined, { type: LOCATION_CHANGE, payload: '/test' }).toJS();
    const expected = { locationBeforeTransitions: '/test' };
    expect(state).toEqual(expected);
  });

  it('should select the root state', () => {
    const state = fromJS({});
    const globalState = fromJS({ route: state });
    expect(getRoot(globalState)).toEqual(state);
  });

  it('should select the route as a plain JS object', () => {
    const plainState = { locationBeforeTransitions: '/test' };
    const state = fromJS(plainState);
    const globalState = fromJS({ route: state });
    expect(getRootAsJS(globalState)).toEqual(plainState);
  });
});
