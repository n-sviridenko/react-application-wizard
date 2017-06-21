import { setLocale, SET_LOCALE } from './global';

describe('global actions', () => {
  describe('setLocale', () => {
    it('has a type of SET_LOCALE', () => {
      const expected = {
        type: SET_LOCALE,
        payload: 'de',
      };
      expect(setLocale('de')).toEqual(expected);
    });
  });
});
