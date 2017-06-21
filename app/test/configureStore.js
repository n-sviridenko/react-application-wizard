import baseConfigureStore from 'redux-mock-store';
import { fromJS } from 'immutable';

const storeFactory = baseConfigureStore();

export default function configureStore(initialState = {}) {
  const finalInitialState = fromJS({
    global: {
      locale: 'en',
    },
    ...initialState,
  });

  return storeFactory(finalInitialState);
}
