import React from 'react';
import { shallow } from 'enzyme';

import Container from './Container';

describe('<Container />', () => {
  it('should render its children', () => {
    const children = <div />;
    const component = shallow(<Container>{children}</Container>);
    expect(component.contains(children)).toBe(true);
  });
});
