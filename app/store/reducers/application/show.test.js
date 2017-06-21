import { fromJS } from 'immutable';

import { showRequest, showSuccess, showFail } from 'store/actions/application';
import reducer, { getRoot, makeGetById } from './show';

describe('application show reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});
    const expected = fromJS({});
    expect(state).toEqual(expected);
  });

  it('should react on show request', () => {
    const state = reducer(undefined, showRequest(1)).toJS();
    const loader = { loading: true, error: null, data: null };
    const expected = { 1: loader };
    expect(state).toEqual(expected);
  });

  it('should react on show success', () => {
    const data = {};
    const state = reducer(undefined, showSuccess(data, 1)).toJS();
    const loader = { loading: false, error: null, data };
    const expected = { 1: loader };
    expect(state).toEqual(expected);
  });

  it('should react on show error', () => {
    const error = new Error();
    const state = reducer(undefined, showFail(error, 1)).toJS();
    const loader = { loading: false, error, data: null };
    const expected = { 1: loader };
    expect(state).toEqual(expected);
  });

  it('should select the root state', () => {
    const state = fromJS({});
    const globalState = fromJS({ application: { show: state } });
    expect(getRoot(globalState)).toEqual(state);
  });

  it('should select the loader state', () => {
    const application = {};
    const globalState = fromJS({
      application: {
        show: {
          1: { data: 1 },
        },
      },
      entities: {
        application: { 1: application },
      },
    });
    expect(makeGetById(1)(globalState).toJS()).toEqual({ data: application });
  });
});
