/*
 *
 * AppRoot
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import muiBaseTheme from 'styles/baseTheme';
import LanguageProvider from 'containers/LanguageProvider';

class AppRoot extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store, messages, muiOptions, children } = this.props;
    return (
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <MuiThemeProvider muiTheme={getMuiTheme(muiBaseTheme, muiOptions)}>
            {React.Children.only(children)}
          </MuiThemeProvider>
        </LanguageProvider>
      </Provider>
    );
  }
}

AppRoot.propTypes = {
  store: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  muiOptions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

AppRoot.defaultProps = {
  muiOptions: {},
};

export default AppRoot;
