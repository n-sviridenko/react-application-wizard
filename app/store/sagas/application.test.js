/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import { Map } from 'immutable';

import * as actions from 'store/actions/application';
import { show, showWatcher, create, createWatcher } from './application';

describe('application saga', () => {
  describe('show', () => {
    let showTask;

    beforeEach(() => {
      showTask = show({ payload: 1, meta: { key: '1' } });

      const callDescriptor = showTask.next().value;
      expect(callDescriptor).toMatchSnapshot();
    });

    it('should dispatch the showSuccess if request was succeeded', () => {
      const putDescriptor = showTask.next(1).value;
      expect(putDescriptor).toEqual(put(actions.showSuccess(1, '1')));
    });

    it('should dispatch the showFail if request was failed', () => {
      const error = new Error();
      const putDescriptor = showTask.throw(error).value;
      expect(putDescriptor).toEqual(put(actions.showFail(error, '1')));
    });
  });

  describe('showWatcher', () => {
    const showWatcherTask = showWatcher();

    it('should start task to watch for SHOW_REQUEST action', () => {
      const takeLatestDescriptor = showWatcherTask.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(actions.SHOW_REQUEST, show));
    });
  });

  describe('create', () => {
    let createTask;

    beforeEach(() => {
      createTask = create({
        payload: Map({
          firstName: 'Nikita',
          lastName: 'Sviridenko',
          email: 'mail.sviridenko@gmail.com',
          phone: null,
          location: {
            placeId: 'xxxx',
            name: 'Lyon, France',
          },
        }),
      });

      const callDescriptor = createTask.next().value;
      expect(callDescriptor).toMatchSnapshot();
    });

    it('should dispatch the createSuccess if request was succeeded', () => {
      const putDescriptor = createTask.next(1).value;
      expect(putDescriptor).toEqual(put(actions.createSuccess(1)));
    });

    it('should dispatch the createFail if request was failed', () => {
      const error = new Error();
      const putDescriptor = createTask.throw(error).value;
      expect(putDescriptor).toEqual(put(actions.createFail(error)));
    });
  });

  describe('createWatcher', () => {
    const createWatcherTask = createWatcher();

    it('should start task to watch for CREATE_REQUEST action', () => {
      const takeLatestDescriptor = createWatcherTask.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(actions.CREATE_REQUEST, create));
    });
  });
});
