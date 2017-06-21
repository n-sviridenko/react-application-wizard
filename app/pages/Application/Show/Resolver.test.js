import React from 'react';
import { shallow } from 'enzyme';

import EnhancedResolver, { Resolver } from './Resolver';
import Show from './Show';

describe('<Resolver />', () => {
  it('should transfer params', () => {
    const component = shallow(<Resolver params={{ id: '1' }} />);
    expect(component.find(Show).prop('id')).toBe(1);
  });
});

describe('<EnhancedResolver />', () => {
  let router;

  function shallowResolver(params) {
    const location = { pathname: '/', search: '', action: 'POP' };

    return shallow(<EnhancedResolver router={router} params={params} location={location} />);
  }

  beforeEach(() => {
    router = {
      push: () => {},
      replace: () => {},
      go: () => {},
      goBack: () => {},
      goForward: () => {},
      setRouteLeaveHook: () => {},
      isActive: () => {},
    };
  });

  it('should render resolver if params are valid', () => {
    const component = shallowResolver({ id: '1' });
    expect(component.find(Resolver).exists()).toBe(true);
  });

  it('should not render resolver if params are not valid', () => {
    const component = shallowResolver({ id: '-1' });
    expect(component.find(Resolver).exists()).toBe(false);
  });
});
