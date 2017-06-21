/* eslint-disable redux-saga/yield-effects */
import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { schema } from 'normalizr';

import request from 'utils/request';
import { merge } from 'store/actions/entities';
import { sendRequest } from './api';

jest.mock('config', () => (
  {
    apiBaseUrl: 'http://api.io',
  }
));

describe('api saga', () => {
  describe('sendRequest', () => {
    it('should send "get" request', () => {
      const sendRequestTask = sendRequest('get', 'users', { foo: 'bar' });
      const callEffect = call(request, 'http://api.io/users?foo=bar', { method: 'GET', headers: {} });
      expect(sendRequestTask.next().value).toEqual(callEffect);
    });

    it('should send "post" request', () => {
      const sendRequestTask = sendRequest('post', 'users', { foo: 'bar' });
      const callEffect = call(
        request,
        'http://api.io/users',
        { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"foo":"bar"}' },
      );
      expect(sendRequestTask.next().value).toEqual(callEffect);
    });

    it('should send FormData', () => {
      const formData = new FormData();
      const sendRequestTask = sendRequest('post', 'users', formData);
      const callEffect = call(request, 'http://api.io/users', { method: 'POST', headers: {}, body: formData });
      expect(sendRequestTask.next().value).toEqual(callEffect);
    });

    it('should return immutable response', () => {
      const sendRequestTask = sendRequest('get', 'users');
      expect(sendRequestTask.next().value).toMatchSnapshot();
      const returnDescriptor = sendRequestTask.next({});
      expect(returnDescriptor.value).toEqual(fromJS({}));
      expect(returnDescriptor.done).toBe(true);
    });

    it('should return normalize response if schema is specified', () => {
      const responseSchema = new schema.Entity('user');
      const sendRequestTask = sendRequest('get', 'users/1', null, responseSchema);
      expect(sendRequestTask.next().value).toMatchSnapshot();
      const user = { id: 1, name: 'Sam' };
      const entities = fromJS({ user: { 1: user } });
      const mergeDescriptor = sendRequestTask.next(user);
      expect(mergeDescriptor.value).toEqual(put(merge(entities)));
      const returnDescriptor = sendRequestTask.next();
      expect(returnDescriptor.value).toBe(1);
      expect(returnDescriptor.done).toBe(true);
    });
  });
});
