import React from 'react';
import PropTypes from 'prop-types';
import muiThemable from 'material-ui/styles/muiThemeable';

function getStyles({ type, muiTheme }) {
  const mapColorByType = {
    danger: muiTheme.palette.dangerColor,
  };

  return {
    root: {
      backgroundColor: muiTheme.palette.primary3Color,
      color: mapColorByType[type],
    },
  };
}

export function Alert(props) {
  const { children } = props;
  const styles = getStyles(props);

  return (
    <div className="p-3 mb-3" style={styles.root}>{children}</div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(['danger']), // eslint-disable-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
  muiTheme: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default muiThemable()(Alert);
