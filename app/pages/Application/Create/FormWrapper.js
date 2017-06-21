import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'components/Common';

function FormWrapper({ title, error, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      {error && <Alert type="danger" text={error} />}
      {children}
    </form>
  );
}

FormWrapper.propTypes = {
  title: PropTypes.node.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormWrapper;
