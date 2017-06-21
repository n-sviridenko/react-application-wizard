import { fromJS } from 'immutable';

import { setLocale } from 'store/actions/global';
import reducer, { getRoot, getLocale } from './global';

describe('global reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});
    const expected = fromJS({ locale: 'en' });
    expect(state).toEqual(expected);
  });

  it('changes the locale', () => {
    const state = reducer(undefined, setLocale('de')).toJS();
    const expected = { locale: 'de' };
    expect(state).toEqual(expected);
  });

  it('should select the root state', () => {
    const state = fromJS({});
    const globalState = fromJS({ global: state });
    expect(getRoot(globalState)).toEqual(state);
  });

  it('should select the locale', () => {
    const state = fromJS({ locale: 'en' });
    const globalState = fromJS({ global: state });
    expect(getLocale(globalState)).toEqual('en');
  });
});
