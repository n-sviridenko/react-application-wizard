import React from 'react';
import { Iterable } from 'immutable';
import isFunction from 'lodash/isFunction';

function withWatcher(dataGetter, onDataChange) {
  const finalDataGetter = isFunction(dataGetter) ? dataGetter : (props) => props[dataGetter];

  function executeDataChangeHooks(props) {
    const data = finalDataGetter(props);

    onDataChange(data, props);
  }

  return function wrapWithWatcher(WrappedComponent) {
    class Watcher extends React.PureComponent {
      componentWillMount() {
        executeDataChangeHooks(this.props);
      }

      componentWillUpdate(nextProps) {
        const nextData = finalDataGetter(nextProps);
        const data = finalDataGetter(this.props);
        const isEqual = Iterable.isIterable(nextData) ? nextData.equals(data) : nextData === data;

        if (!isEqual) {
          executeDataChangeHooks(nextProps);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return Watcher;
  };
}

export default withWatcher;
