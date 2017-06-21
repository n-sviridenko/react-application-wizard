import React from 'react';
import { mount } from 'enzyme';

import { AppRoot } from 'components/Core';

export default function makeMountWithContext(store, messages = {}, muiOptions = {}) {
  return function mountWithContext(children) {
    return mount(<AppRoot store={store} messages={messages} muiOptions={muiOptions}>{children}</AppRoot>);
  };
}
