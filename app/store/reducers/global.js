import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { defaultLocale } from 'config';
import { SET_LOCALE } from 'store/actions/global';

const initialState = fromJS({
  locale: defaultLocale,
});

export default handleActions({
  [SET_LOCALE]: (state, { payload }) => state.set('locale', payload),
}, initialState);

export const getRoot = (state) => state.get('global');
export const getLocale = createSelector(getRoot, (state) => state.get('locale'));
