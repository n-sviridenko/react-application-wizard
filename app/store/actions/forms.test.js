import { submit, SUBMIT, buildSubmit } from './forms';

describe('forms actions', () => {
  describe('submit', () => {
    it('has a type of SUBMIT', () => {
      const expected = {
        type: SUBMIT,
        payload: null,
        meta: {},
      };
      expect(submit({})).toEqual(expected);
    });
  });

  describe('buildSubmit', () => {
    const requestActionType = 'REQUEST';
    const requestActionCreator = (payload) => ({ type: requestActionType, payload });
    const successActionType = 'SUCCESS';
    const failActionType = 'FAIL';
    const submitHandler = buildSubmit(requestActionCreator, successActionType, failActionType);
    const values = {};
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('should dispatch submit', () => {
      expect.assertions(4);
      submitHandler(values, dispatch);
      // use Promise instead of setTimeout
      return Promise.resolve().then(() => {
        expect(dispatch.mock.calls.length).toBe(1);
        const submitAction = dispatch.mock.calls[0][0];
        expect(submitAction.meta.requestAction.type).toBe(requestActionType);
        expect(submitAction.meta.successActionType).toBe(successActionType);
        expect(submitAction.meta.failActionType).toBe(failActionType);
      });
    });

    it('should resolve promise if resolve was called', () => {
      expect.assertions(2);
      const response = {};
      // use Promise instead of setTimeout
      Promise.resolve().then(() => {
        expect(dispatch.mock.calls.length).toBe(1);
        const submitAction = dispatch.mock.calls[0][0];
        submitAction.meta.resolve(response);
      });
      return submitHandler(values, dispatch).then((res) => expect(res).toEqual(response));
    });

    it('should reject promise if reject was called', () => {
      expect.assertions(2);
      const error = new Error();
      // use Promise instead of setTimeout
      Promise.resolve().then(() => {
        expect(dispatch.mock.calls.length).toBe(1);
        const submitAction = dispatch.mock.calls[0][0];
        submitAction.meta.reject(error);
      });
      return submitHandler(values, dispatch).catch((err) => expect(err).toEqual(error));
    });
  });
});
