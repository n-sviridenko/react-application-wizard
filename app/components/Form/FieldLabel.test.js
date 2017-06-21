import React from 'react';
import { shallow } from 'enzyme';

import FieldLabel from './FieldLabel';

describe('<FieldLabel />', () => {
  it('should display its children', () => {
    const component = shallow(<FieldLabel>Field name</FieldLabel>);
    expect(component.text()).toBe('Field name');
  });

  it('should display asterisk if the field is required', () => {
    const component = shallow(<FieldLabel required>Field name</FieldLabel>);
    expect(component.text()).toBe('Field name *');
  });
});
