import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';

function getStyles({ error }) {
  return {
    refreshContainer: {
      display: 'inline-block',
      transform: 'rotate(-90deg)',
    },
    refresh: {
      position: 'static',
      cursor: 'pointer',
      transform: 'none',
      left: 0,
      top: 0,
      display: error ? 'block' : 'none',
    },
  };
}

function LoadingOverlay(props) {
  const { children, loading, error, onReload } = props;
  const styles = getStyles(props);

  if (loading) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div style={styles.refreshContainer}>
          <RefreshIndicator
            left={0}
            top={0}
            percentage={100}
            status="ready"
            style={styles.refresh}
            onTouchTap={onReload}
          />
        </div>
      </div>
    );
  }

  return children;
}

LoadingOverlay.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  onReload: PropTypes.func.isRequired,
};

export default LoadingOverlay;
