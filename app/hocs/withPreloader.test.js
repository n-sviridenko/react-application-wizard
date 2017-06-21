import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { LoadingOverlay } from 'components/Common';
import withPreloader from './withPreloader';

describe('withPreloader', () => {
  let Component;
  let onLoadRequest;

  function WrappedComponent() {
    return null;
  }

  beforeEach(() => {
    onLoadRequest = jest.fn();
    Component = withPreloader(
      () => null,
      onLoadRequest,
      { overlayBuilder: (props) => <LoadingOverlay {...props} /> },
    )(WrappedComponent);
  });

  it('should return null if loader is undefined', () => {
    const renderedComponent = shallow(<Component loader={null} />);
    expect(renderedComponent.find(LoadingOverlay).exists()).toBe(false);
  });

  it('should return null if loader is empty', () => {
    const loader = fromJS({ loading: false, error: null, data: null });
    const renderedComponent = shallow(<Component loader={loader} />);
    expect(renderedComponent.find(LoadingOverlay).exists()).toBe(false);
  });

  it('should render overlay if loader is not empty', () => {
    const error = new Error();
    const loader = fromJS({ loading: true, error, data: null });
    const renderedComponent = shallow(<Component loader={loader} />);
    const watcherComponent = renderedComponent.first().shallow();
    const overlayComponent = watcherComponent.find(LoadingOverlay);
    expect(overlayComponent.exists()).toBe(true);
    expect(overlayComponent.prop('loading')).toBe(true);
    expect(overlayComponent.prop('error')).toBe(error);
    expect(watcherComponent.find(WrappedComponent).exists()).toBe(true);
  });

  it('should trigger load request if onReload was called', () => {
    const loader = fromJS({ loading: true, error: null, data: null });
    const renderedComponent = shallow(<Component loader={loader} />);
    const overlayComponent = renderedComponent.first().shallow().find(LoadingOverlay);
    overlayComponent.prop('onReload')();
    expect(onLoadRequest.mock.calls.length).toBe(2);
  });
});
