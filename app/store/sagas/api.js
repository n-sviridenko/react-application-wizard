import qs from 'qs';
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { call, put } from 'redux-saga/effects';

import request from 'utils/request';
import { merge } from 'store/actions/entities';
import { apiBaseUrl } from 'config';

export function* sendRequest(method, endpoint, data = null, responseSchema = null, options = {}) {
  const headers = { ...options.headers };
  const finalMethod = method.toUpperCase();

  let url = `${apiBaseUrl}/${endpoint}`;
  let body;

  if (['GET', 'HEAD'].indexOf(finalMethod) !== -1) {
    const query = qs.stringify(data);

    if (query !== '') {
      url = `${url}?${query}`;
    }
  } else if (data instanceof FormData) {
    body = data;
  } else if (data) {
    headers['content-type'] = 'application/json';
    body = JSON.stringify(data);
  }

  const response = yield call(request, url, { ...options, method: finalMethod, headers, body });

  if (responseSchema === null) {
    return fromJS(response);
  }

  const { result, entities } = normalize(response, responseSchema);

  yield put(merge(fromJS(entities)));

  return fromJS(result);
}
