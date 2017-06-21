import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { createSelector } from 'reselect';

const initialState = fromJS({
  locationBeforeTransitions: null,
});

export default handleActions({
  [LOCATION_CHANGE]: (state, { payload }) => state.set('locationBeforeTransitions', payload),
}, initialState);

export const getRoot = (state) => state.get('route');
export const getRootAsJS = createSelector(getRoot, (state) => state.toJS());
