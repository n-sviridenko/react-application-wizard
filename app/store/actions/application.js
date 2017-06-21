import { createAction } from 'redux-actions';

export const SHOW_REQUEST = 'app/application/SHOW_REQUEST';
export const SHOW_SUCCESS = 'app/application/SHOW_SUCCESS';
export const SHOW_FAIL = 'app/application/SHOW_FAIL';

export const showRequest = createAction(SHOW_REQUEST, null, (id) => ({ key: id }));
export const showSuccess = createAction(SHOW_SUCCESS, null, (item, id) => ({ key: id }));
export const showFail = createAction(SHOW_FAIL, null, (err, id) => ({ key: id }));

export const CREATE_REQUEST = 'app/application/CREATE_REQUEST';
export const CREATE_SUCCESS = 'app/application/CREATE_SUCCESS';
export const CREATE_FAIL = 'app/application/CREATE_FAIL';

export const createRequest = createAction(CREATE_REQUEST);
export const createSuccess = createAction(CREATE_SUCCESS);
export const createFail = createAction(CREATE_FAIL);
