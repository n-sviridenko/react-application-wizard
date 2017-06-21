import { getPredictions } from 'utils/placeSearchProvider';
import createAutoComplete from './createAutoComplete';

const dataSourceConfig = {
  value: 'placeId',
  text: 'name',
};

export default createAutoComplete(getPredictions, dataSourceConfig);
