import React from 'react';
import isObject from 'lodash/isObject';
import { FormattedMessage } from 'react-intl';

function normalizeErrorText(errorText) {
  if (!isObject(errorText)) {
    return null;
  }

  const { message, values } = errorText;

  return <FormattedMessage {...message} values={values} />;
}

function mapError(
  {
    meta: { touched, submitFailed, error, warning } = {},
    input: { ...inputProps },
    ignoreError,
    ...props
  },
  errorProp = 'errorText',
) {
  const errorText = error || warning;

  if (ignoreError || (!touched && !submitFailed) || !errorText) {
    return { ...inputProps, ...props };
  }

  return {
    ...props,
    ...inputProps,
    [errorProp]: normalizeErrorText(errorText),
  };
}

export default mapError;
