import React from 'react';
import PropTypes from 'prop-types';

function FieldLabel({ children, required }) {
  return (
    <span>
      {children}
      {required && ' *'}
    </span>
  );
}

FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
};

export default FieldLabel;
