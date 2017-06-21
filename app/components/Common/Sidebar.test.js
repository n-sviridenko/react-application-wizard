import React from 'react';
import { shallow } from 'enzyme';

import LocaleToggle from 'containers/LocaleToggle';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  it('should render locale toggle', () => {
    const component = shallow(<Sidebar />);
    expect(component.find(LocaleToggle).exists()).toBe(true);
  });
});
