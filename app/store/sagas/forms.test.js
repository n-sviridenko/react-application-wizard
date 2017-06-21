/* eslint-disable redux-saga/yield-effects */
import { SubmissionError } from 'redux-form';
import { take, takeEvery, race, call } from 'redux-saga/effects';

import { SUBMIT } from 'store/actions/forms';
import { formSubmit, formSubmitWatcher } from './forms';

describe('forms saga', () => {
  const requestAction = {
    type: 'TEST_REQUEST',
    payload: { foo: 'bar' },
  };

  const successActionType = 'TEST_SUCCESS';
  const failActionType = 'TEST_FAIL';
  const resolve = () => {};
  const reject = () => {};

  let formSubmitTask;

  beforeEach(() => {
    formSubmitTask = formSubmit({
      meta: {
        requestAction,
        successActionType,
        failActionType,
        resolve,
        reject,
      },
    });

    const requestDescriptor = formSubmitTask.next().value;
    expect(requestDescriptor).toMatchSnapshot();

    const raceDescriptor = formSubmitTask.next().value;
    const expectedRaceDescriptor = race({
      success: take(successActionType),
      failure: take(failActionType),
    });
    expect(raceDescriptor).toEqual(expectedRaceDescriptor);
  });

  it('should execute resolve it successAction was received', () => {
    const actionDescriptor = formSubmitTask.next({ success: { payload: {} } }).value;
    expect(actionDescriptor).toEqual(call(resolve, {}));
  });

  it('should execute resolve it failAction was received', () => {
    const actionDescriptor = formSubmitTask.next({ failure: { payload: {} } }).value;
    expect(actionDescriptor).toEqual(call(reject, new SubmissionError({})));
  });
});

describe('formSubmitWatcher Saga', () => {
  const formSubmitWatcherSaga = formSubmitWatcher();

  it('should start task to watch for SUBMIT action', () => {
    const takeLatestDescriptor = formSubmitWatcherSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeEvery(SUBMIT, formSubmit));
  });
});
