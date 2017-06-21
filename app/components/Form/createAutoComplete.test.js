import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from 'material-ui/AutoComplete';

import createAutoComplete from './createAutoComplete';

describe('createAutoComplete', () => {
  it('should call dataSourceHandler', () => {
    expect.assertions(2);
    const dataSourceHandler = jest.fn(() => Promise.resolve([]));
    const EnhancedAutoComplete = createAutoComplete(dataSourceHandler, {}, false);
    const component = shallow(<EnhancedAutoComplete />);
    component.find(AutoComplete).prop('onUpdateInput')('Apple');
    // use Promise instead of setTimeout
    return Promise.resolve().then(() => {
      expect(dataSourceHandler.mock.calls.length).toBe(1);
      expect(dataSourceHandler.mock.calls[0][0]).toBe('Apple');
    });
  });

  it('should transfer dataSource to autocomplete', () => {
    expect.assertions(1);
    const dataSource = [{}];
    const dataSourceHandler = jest.fn(() => Promise.resolve(dataSource));
    const EnhancedAutoComplete = createAutoComplete(dataSourceHandler, {}, false);
    const component = shallow(<EnhancedAutoComplete />);
    component.find(AutoComplete).prop('onUpdateInput')('Apple');
    // use Promise instead of setTimeout
    return Promise.resolve().then(() => {
      expect(component.find(AutoComplete).prop('dataSource')).toEqual(dataSource);
    });
  });
});
