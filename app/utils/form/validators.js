import isEmpty from 'lodash/isEmpty';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  required: {
    id: 'app.form.validator.required',
    defaultMessage: 'This field is required',
  },
});

function createError(type, values) {
  return {
    message: messages[type],
    values,
  };
}

export const isRequired = (value) => isEmpty(value) && !value ? createError('required') : undefined;
