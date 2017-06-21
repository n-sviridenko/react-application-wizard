/* global google */
import set from 'lodash/set';
import unset from 'lodash/unset';

import { getPredictions } from './placeSearchProvider';

describe('placeSearchProvider', () => {
  describe('getPredictions', () => {
    function mockAutocompleteService(rawPredictions, status) {
      const getQueryPredictions = jest.fn(({ input }, callback) => callback(rawPredictions, status));

      class AutocompleteService {
        constructor() {
          this.getQueryPredictions = getQueryPredictions;
        }
      }

      set(global, 'google.maps.places.AutocompleteService', AutocompleteService);

      return getQueryPredictions;
    }

    it('should transfer the query and map predictions', () => {
      expect.assertions(2);
      set(global, 'google.maps.places.PlacesServiceStatus.OK', 'OK');
      const rawPredictions = [{ place_id: 'xxxx', description: 'New York' }];
      const expectedPredictions = [{ placeId: 'xxxx', name: 'New York' }];
      const getQueryPredictions = mockAutocompleteService(rawPredictions, global.google.maps.places.PlacesServiceStatus.OK);
      return getPredictions('NY').then((predictions) => {
        expect(getQueryPredictions.mock.calls[0][0].input).toBe('NY');
        expect(predictions).toEqual(expectedPredictions);
      });
    });

    it('should return an empty list in case of error', () => {
      expect.assertions(1);
      mockAutocompleteService(null, 'BAD_STATUS');
      return getPredictions('NY').then((predictions) => expect(predictions).toEqual([]));
    });

    it('should return an empty list if google libraries were not loaded', () => {
      expect.assertions(1);
      return getPredictions('NY').then((predictions) => expect(predictions).toEqual([]));
    });

    afterEach(() => {
      unset(global, 'google');
    });
  });
});
