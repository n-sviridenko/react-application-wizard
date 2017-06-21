import React from 'react';
import isFunction from 'lodash/isFunction';

import withWatcher from './withWatcher';

function getData(loader) {
  return loader.get('data') || loader.get('items');
}

function withPreloader(loaderParamsGetter, onLoadRequest, options = {}) {
  const {
    overlayBuilder,
    loaderGetter = (props) => props.loader,
  } = options;

  const finalParamsGetter = isFunction(loaderParamsGetter) ? loaderParamsGetter : (props) => props[loaderParamsGetter];

  return function wrapWithPreloader(WrappedComponent) {
    function Preloader(props) {
      const loader = loaderGetter(props);

      if (
        !loader ||
        (!loader.get('loading') && !loader.get('error') && !getData(loader))
      ) {
        return null;
      }

      const handleLoadRequest = () => {
        const data = finalParamsGetter(props);

        onLoadRequest(data, props);
      };

      const overlayProps = {
        loading: loader.get('loading'),
        error: loader.get('error'),
        onReload: handleLoadRequest,
        children: <WrappedComponent {...props} />,
      };

      return overlayBuilder(overlayProps);
    }

    return withWatcher(finalParamsGetter, onLoadRequest)(Preloader);
  };
}

export default withPreloader;
