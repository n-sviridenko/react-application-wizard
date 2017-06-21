import {
  showRequest,
  showSuccess,
  showFail,
  SHOW_REQUEST,
  SHOW_SUCCESS,
  SHOW_FAIL,
  createRequest,
  createSuccess,
  createFail,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAIL,
} from './application';

describe('application actions', () => {
  describe('showRequest', () => {
    it('has a type of SHOW_REQUEST', () => {
      const expected = { type: SHOW_REQUEST, payload: 1, meta: { key: 1 } };
      expect(showRequest(1)).toEqual(expected);
    });
  });

  describe('showSuccess', () => {
    it('has a type of SHOW_SUCCESS', () => {
      const expected = { type: SHOW_SUCCESS, payload: {}, meta: { key: 1 } };
      expect(showSuccess({}, 1)).toEqual(expected);
    });
  });

  describe('showFail', () => {
    it('has a type of SHOW_FAIL', () => {
      const error = new Error();
      const expected = { type: SHOW_FAIL, payload: error, meta: { key: 1 }, error: true };
      expect(showFail(error, 1)).toEqual(expected);
    });
  });

  describe('createRequest', () => {
    it('has a type of CREATE_REQUEST', () => {
      const expected = { type: CREATE_REQUEST, payload: {} };
      expect(createRequest({})).toEqual(expected);
    });
  });

  describe('createSuccess', () => {
    it('has a type of CREATE_SUCCESS', () => {
      const expected = { type: CREATE_SUCCESS, payload: 1 };
      expect(createSuccess(1)).toEqual(expected);
    });
  });

  describe('createFail', () => {
    it('has a type of CREATE_FAIL', () => {
      const error = new Error();
      const expected = { type: CREATE_FAIL, payload: error, error: true };
      expect(createFail(error)).toEqual(expected);
    });
  });
});
