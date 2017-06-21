// from https://github.com/erikras/redux-form-material-ui

import TextField from 'material-ui/TextField';

import createComponent from './createComponent';
import mapError from './mapError';

export default createComponent(
  TextField,
  ({
    input: {
      ...inputProps
    },
    defaultValue,
    ...props
  }) => {
    if (inputProps.value === '') {
      inputProps.value = defaultValue || inputProps.value; // eslint-disable-line no-param-reassign
    }

    return {
      ...inputProps,
      ...mapError(props),
    };
  }
);
