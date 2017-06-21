import React from 'react';
import { shallow } from 'enzyme';

import withWatcher from './withWatcher';

describe('withWatcher', () => {
  let Component;
  let loadRequest;

  function WrappedComponent() {
    return null;
  }

  beforeEach(() => {
    Component = withWatcher((props) => props.id, (id, props) => props.loadRequest(id))(WrappedComponent);
    loadRequest = jest.fn();
  });

  it('should call loadRequest when component was mounted', () => {
    shallow(<Component id={1} loadRequest={loadRequest} />);
    expect(loadRequest.mock.calls.length).toBe(1);
    expect(loadRequest.mock.calls[0][0]).toBe(1);
  });

  it('should call loadRequest only if affecting data changes', () => {
    const renderedComponent = shallow(<Component id={1} foo="bar" loadRequest={loadRequest} />);
    expect(loadRequest.mock.calls.length).toBe(1);
    expect(loadRequest.mock.calls[0][0]).toBe(1);
    renderedComponent.setProps({ id: 5 });
    expect(loadRequest.mock.calls.length).toBe(2);
    expect(loadRequest.mock.calls[1][0]).toBe(5);
    renderedComponent.setProps({ foo: 'other' });
    expect(loadRequest.mock.calls.length).toBe(2);
  });
});
