import React from 'react';
import { shallow } from 'enzyme';

import { translationMessages } from 'i18n';
import { configureStore, makeMountWithContext } from 'test';
import ConnectedLocaleToggle, { LocaleToggle } from './LocaleToggle';

describe('<LocaleToggle />', () => {
  it('should dispatch changeLocale when called', () => {
    const setLocaleMock = jest.fn();
    const renderedComponent = shallow(<LocaleToggle setLocale={setLocaleMock} />);
    const locale = 'de';

    renderedComponent.find('SelectField').prop('onChange')(null, null, locale);
    expect(setLocaleMock).toHaveBeenCalledWith(locale);
  });
});

describe('<ConnectedLocaleToggle />', () => {
  let store;
  let renderedComponent;

  beforeAll(() => {
    store = configureStore();
    const mount = makeMountWithContext(store, translationMessages);
    renderedComponent = mount(<ConnectedLocaleToggle />);
  });

  it('should pass the default locale', () => {
    expect(renderedComponent.find('SelectField').prop('value')).toBe('en');
  });
});
