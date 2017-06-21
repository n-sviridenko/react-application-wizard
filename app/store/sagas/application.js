import { call, put, takeLatest } from 'redux-saga/effects';

import * as schemas from 'store/schemas';
import * as actions from 'store/actions/application';
import { sendRequest } from './api';

export function* show({ payload: id, meta }) {
  try {
    const res = yield call(sendRequest, 'get', `applications/${id}`, null, schemas.application);

    yield put(actions.showSuccess(res, meta.key));
  } catch (err) {
    yield put(actions.showFail(err, meta.key));
  }
}

export function* showWatcher() {
  yield takeLatest(actions.SHOW_REQUEST, show);
}

export function* create({ payload }) {
  const data = {
    firstName: payload.get('firstName'),
    lastName: payload.get('lastName'),
    phone: payload.get('phone'),
    email: payload.get('email'),
    locationName: payload.get('location').name,
  };

  try {
    const res = yield call(sendRequest, 'post', 'applications', data, schemas.application);

    yield put(actions.createSuccess(res));
  } catch (err) {
    yield put(actions.createFail(err));
  }
}

export function* createWatcher() {
  yield takeLatest(actions.CREATE_REQUEST, create);
}

export default [
  showWatcher,
  createWatcher,
];
