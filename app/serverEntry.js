/**
 * Server side rendering application entry module.
 *
 * This module is being transpiled by webpack and placed under
 * server/middlewares/ as `generated.serverEntry.js`.
 *
 * The server uses it to render the app at given location.
 */
import 'babel-polyfill'; // for regeneratorRuntime

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { END } from 'redux-saga';
import Helmet from 'react-helmet';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createStore from 'store';
import createRoutes from 'routes';

import { AppRoot, HtmlDocument } from 'components/Core';
import { setLocale } from 'store/actions/global';
import { startSagas } from 'store/sagas';

import syncHistoryWithStore from 'setup/syncHistoryWithStore';
import monitorSagas from 'utils/monitorSagas';

import { appLocales, translationMessages } from './i18n';

// it's already injected in case if the current environment is "test"
if (process.env.NODE_ENV !== 'test') {
  // Needed for onTouchTap
  // http://stackoverflow.com/a/34015469/988941
  injectTapEventPlugin();
}

function renderAppToString(store, renderProps, muiOptions) {
  return renderToString(
    <AppRoot store={store} messages={translationMessages} muiOptions={muiOptions}>
      <RouterContext {...renderProps} />
    </AppRoot>
  );
}

async function renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames, userAgent }) {
  // options for material-ui
  const muiOptions = { userAgent };

  // 1st render phase - triggers the sagas
  renderAppToString(store, renderProps, muiOptions);

  // send signal to sagas that we're done
  store.dispatch(END);

  // wait for all tasks to finish
  await sagasDone();

  // capture the state after the first render
  const state = store.getState().toJS();

  // 2nd render phase - the sagas triggered in the first phase are resolved by now
  const appMarkup = renderAppToString(store, renderProps, muiOptions);

  // capture the generated css
  const css = styleSheet.injected
    ? styleSheet.rules().map((rule) => rule.cssText).join('\n')
    : '';

  const doc = renderToStaticMarkup(
    <HtmlDocument
      appMarkup={appMarkup}
      lang={state.global.locale}
      state={state}
      head={Helmet.rewind()}
      assets={assets}
      css={css}
      webpackDllNames={webpackDllNames}
    />
  );
  return `<!DOCTYPE html>\n${doc}`;
}

function is404(routes) {
  return routes.some((r) => r.name === 'notfound');
}

function renderAppToStringAtLocation(url, { webpackDllNames = [], assets, lang, userAgent }, callback) {
  const memHistory = createMemoryHistory(url);
  const store = createStore({}, memHistory);

  syncHistoryWithStore(memHistory, store);

  const routes = createRoutes(store);

  const sagasDone = monitorSagas(store);

  startSagas(store);

  store.dispatch(setLocale(lang));

  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback({ error });
    } else if (redirectLocation) {
      callback({ redirectLocation: redirectLocation.pathname + redirectLocation.search });
    } else if (renderProps) {
      renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames, userAgent })
        .then((html) => {
          const notFound = is404(renderProps.routes);
          callback({ html, notFound });
        })
        .catch((e) => callback({ error: e }));
    } else {
      callback({ error: new Error('Unknown error') });
    }
  });
}

export {
  appLocales,
  renderAppToStringAtLocation,
};
