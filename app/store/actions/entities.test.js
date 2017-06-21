import { merge, MERGE } from './entities';

describe('entity actions', () => {
  describe('merge', () => {
    it('has a type of MERGE', () => {
      const entities = { test: [] };
      const expected = { type: MERGE, payload: entities };
      expect(merge(entities)).toEqual(expected);
    });
  });
});
