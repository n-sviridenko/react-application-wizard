import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from 'material-ui/CircularProgress';

import LoadingOverlay from './LoadingOverlay';

describe('<LoadingOverlay />', () => {
  it('should render children if it is not loading and not erred', () => {
    const children = <div />;
    const component = shallow(<LoadingOverlay loading={false} error={null} onReload={() => {}}>{children}</LoadingOverlay>);
    expect(component.contains(children)).toBe(true);
  });

  it('should render progress if loading', () => {
    const children = <div />;
    const component = shallow(<LoadingOverlay loading onReload={() => {}}>{children}</LoadingOverlay>);
    expect(component.find(CircularProgress).exists()).toBe(true);
    expect(component.contains(children)).toBe(false);
  });

  it('should render "reload" button if error', () => {
    const children = <div />;
    const component = shallow(<LoadingOverlay loading={false} error={new Error()} onReload={() => {}}>{children}</LoadingOverlay>);
    expect(component.find('RefreshIndicator').exists()).toBe(true);
    expect(component.contains(children)).toBe(false);
  });

  it('should trigger onReload when tap on "reload" button', () => {
    const onReload = jest.fn();
    const component = shallow(<LoadingOverlay loading={false} error={new Error()} onReload={onReload} />);
    component.find('RefreshIndicator').prop('onTouchTap')();
    expect(onReload.mock.calls.length).toBe(1);
  });
});
