import { createAction } from 'redux-actions';

export const SUBMIT = 'app/forms/SUBMIT';

export const submit = createAction(SUBMIT, () => null, (options) => options);

export function buildSubmit(requestActionCreator, successActionType, failActionType) {
  return (values, dispatch) => new Promise((resolve, reject) => {
    const submitOptions = {
      requestAction: requestActionCreator(values),
      successActionType,
      failActionType,
      resolve,
      reject,
    };

    dispatch(submit(submitOptions));
  });
}
