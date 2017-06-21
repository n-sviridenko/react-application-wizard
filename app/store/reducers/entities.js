import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { MERGE } from 'store/actions/entities';

const initialState = fromJS({});

export default handleActions({
  [MERGE]: (state, { payload }) => state.mergeDeep(payload),
}, initialState);

export const getRoot = (state) => state.get('entities');
