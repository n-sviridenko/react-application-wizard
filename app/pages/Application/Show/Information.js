import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { defineMessages, FormattedMessage } from 'react-intl';

import InformationRow from './InformationRow';

const messages = defineMessages({
  firstName: {
    id: 'app.pages.application_show.information.first_name',
    defaultMessage: 'First name',
  },
  lastName: {
    id: 'app.pages.application_show.information.last_name',
    defaultMessage: 'Last name',
  },
  email: {
    id: 'app.pages.application_show.information.email',
    defaultMessage: 'Email address',
  },
  phone: {
    id: 'app.pages.application_show.information.phone',
    defaultMessage: 'Phone number',
  },
  locationName: {
    id: 'app.pages.application_show.information.location_name',
    defaultMessage: 'Location',
  },
});

function Information({ application }) {
  return (
    <div>
      <InformationRow label={<FormattedMessage {...messages.firstName} />}>
        {application.get('firstName')}
      </InformationRow>
      <InformationRow label={<FormattedMessage {...messages.lastName} />}>
        {application.get('lastName')}
      </InformationRow>
      <InformationRow label={<FormattedMessage {...messages.email} />}>
        {application.get('email')}
      </InformationRow>
      <InformationRow label={<FormattedMessage {...messages.phone} />}>
        {application.get('phone')}
      </InformationRow>
      <InformationRow label={<FormattedMessage {...messages.locationName} />}>
        {application.get('locationName')}
      </InformationRow>
    </div>
  );
}

Information.propTypes = {
  application: ImmutablePropTypes.map.isRequired,
};

export default Information;
