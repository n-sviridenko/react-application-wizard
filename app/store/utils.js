import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { getRoot } from 'store/reducers/entities';

export function denormalizeSelector(dataSelector, dataSchema) {
  return createSelector(
    [getRoot, dataSelector],
    (entities, data) => denormalize(data, dataSchema, entities),
  );
}
