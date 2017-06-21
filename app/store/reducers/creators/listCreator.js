import { fromJS } from 'immutable';
import { combineActions, handleAction } from 'redux-actions';
import { createSelector } from 'reselect';

export default function listCreator({ types, itemReducerCreator, ...itemReducerArgs }) {
  const itemReducer = itemReducerCreator({ types, ...itemReducerArgs });
  const initialState = fromJS({});

  return handleAction(
    combineActions(...types),
    (state, action) => {
      const key = `${action.meta.key}`;
      const item = itemReducer(state.get(key), action);

      return state.set(key, item);
    },
    initialState,
  );
}

export const createItemSelector = (stateSelector, key) => createSelector(stateSelector, (state) => state.get(`${key}`));
