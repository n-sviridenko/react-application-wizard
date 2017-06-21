import React from 'react';
import PropTypes from 'prop-types';

function Information({ label, children }) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-6">{label}</div>
        <div className="col-sm-6">{children}</div>
      </div>
    </div>
  );
}

Information.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Information;
