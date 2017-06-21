// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { App } from 'components/Core';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function createChildRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  // eslint-disable-next-line no-unused-vars
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '*',
      getComponent(nextState, cb) {
        import('pages/NotFound')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}

// Set up the router, wrapping all Routes in the App component
export default function createRootRoute(store) {
  return {
    component: App,
    childRoutes: createChildRoutes(store),
  };
}
