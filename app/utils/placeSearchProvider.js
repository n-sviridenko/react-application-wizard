/* global google */
let autocompleteService;

function loadAutocompleteService() {
  if (typeof google === 'undefined') {
    return Promise.reject();
  }

  if (!autocompleteService) {
    autocompleteService = new google.maps.places.AutocompleteService();
  }

  return Promise.resolve();
}

function mapPrediction(prediction) {
  if (!prediction.place_id) {
    return null;
  }

  return {
    placeId: prediction.place_id,
    name: prediction.description,
  };
}

function fetchPredictions(query) {
  return new Promise(
    (resolve, reject) => autocompleteService.getQueryPredictions(
      { input: query },
      (rawPredictions, status) => (
        status === google.maps.places.PlacesServiceStatus.OK
          ? resolve(rawPredictions.map(mapPrediction).filter((item) => item !== null))
          : reject()
      ),
    ),
  );
}

export function getPredictions(query) {
  return loadAutocompleteService()
    .then(() => fetchPredictions(query))
    .catch(() => [])
  ;
}
