import * as schemas from 'store/schemas';
import itemReducerCreator, { createRootSelector } from 'store/reducers/creators/loaderCreator';
import listReducerCreator, { createItemSelector } from 'store/reducers/creators/listCreator';
import { SHOW_REQUEST, SHOW_SUCCESS, SHOW_FAIL } from 'store/actions/application';

export default listReducerCreator({
  itemReducerCreator,
  types: [
    SHOW_REQUEST,
    SHOW_SUCCESS,
    SHOW_FAIL,
  ],
});

const getRoot = (state) => state.getIn(['application', 'show']);
const makeGetRawById = (id) => createItemSelector(getRoot, id);
const makeGetById = (id) => createRootSelector(makeGetRawById(id), schemas.application);

export {
  getRoot,
  makeGetById,
};
