import React from 'react';
import Joi from 'joi-browser';
import { shallow } from 'enzyme';

import withRouteValidator from './withRouteValidator';

describe('withRouteValidator', () => {
  let router;
  let routeSchema;
  let Component;

  function WrappedComponent() {
    return null;
  }

  function renderComponent(params, query) {
    const location = { pathname: '/', search: '', action: 'POP', query };

    return shallow(<Component router={router} params={params} location={location} />);
  }

  beforeEach(() => {
    router = {
      push: () => {},
      replace: jest.fn(),
      go: () => {},
      goBack: () => {},
      goForward: () => {},
      setRouteLeaveHook: () => {},
      isActive: () => {},
    };
    routeSchema = {
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
      query: Joi.object({
        q: Joi.string().min(5),
      }),
    };
    Component = withRouteValidator(routeSchema)(WrappedComponent);
  });

  it('should not redirect if data input params are valid', () => {
    const params = { id: 1 };
    const query = { q: '12345' };
    const renderedComponent = renderComponent(params, query);
    expect(renderedComponent.find(WrappedComponent).exists()).toBe(true);
    expect(router.replace.mock.calls.length).toBe(0);
  });

  it('should redirect if data input params are not valid', () => {
    const params = { id: 1 };
    const query = { q: '123' };
    const renderedComponent = renderComponent(params, query);
    expect(renderedComponent.find(WrappedComponent).exists()).toBe(false);
    expect(router.replace.mock.calls.length).toBe(1);
    expect(router.replace.mock.calls[0][0]).toBe('/');
  });
});
