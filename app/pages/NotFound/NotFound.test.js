import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    expect(renderedComponent.contains(
      <h1>
        <FormattedMessage
          id="app.pages.not_found.not_found.header"
          defaultMessage={'Page not found.'}
        />
      </h1>
    )).toEqual(true);
  });
});
