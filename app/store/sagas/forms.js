import { SubmissionError } from 'redux-form/immutable';
import { take, takeEvery, race, put, call } from 'redux-saga/effects';

import { SUBMIT } from 'store/actions/forms';

export function* formSubmit({ meta }) {
  const {
    requestAction,
    successActionType,
    failActionType,
    resolve,
    reject,
  } = meta;

  yield put(requestAction);

  const { success } = yield race({
    success: take(successActionType),
    failure: take(failActionType),
  });

  if (success) {
    yield call(resolve, success.payload);
  } else {
    yield call(reject, new SubmissionError());
  }
}

export function* formSubmitWatcher() {
  yield takeEvery(SUBMIT, formSubmit);
}

export default [
  formSubmitWatcher,
];
