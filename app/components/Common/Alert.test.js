import React from 'react';
import { shallow } from 'enzyme';

import { Alert } from './Alert';

describe('<Alert />', () => {
  it('should use correct color and render its children', () => {
    const muiTheme = { palette: { primary3Color: 'gray', dangerColor: 'red' } };
    const children = <div />;
    const component = shallow(<Alert type="danger" muiTheme={muiTheme}>{children}</Alert>);
    expect(component.prop('style')).toEqual({ backgroundColor: 'gray', color: 'red' });
    expect(component.children().get(0)).toBe(children);
  });
});
