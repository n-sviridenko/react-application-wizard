import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';

import { showRequest } from 'store/actions/application';
import { makeGetById } from 'store/reducers/application/show';
import { withPreloader } from 'hocs';
import { Container, LoadingOverlay } from 'components/Common';
import Information from './Information';

const messages = defineMessages({
  header: {
    id: 'app.pages.application_show.show.header',
    defaultMessage: 'Application #{id}',
  },
});

export function Show({ loader }) {
  const application = loader.get('data');

  return (
    <Container>
      <h1><FormattedMessage {...messages.header} values={{ id: application.get('id') }} /></h1>
      <Information application={application} />
    </Container>
  );
}

Show.propTypes = {
  loader: ImmutablePropTypes.map.isRequired,
};

const EnhancedShow = withPreloader(
  'id',
  (id, props) => props.showRequest(id),
  { overlayBuilder: (props) => <LoadingOverlay {...props} /> },
)(Show);

EnhancedShow.propTypes = {
  id: PropTypes.number.isRequired,
  showRequest: PropTypes.func.isRequired,
};

const mapState = (state, { id }) => createStructuredSelector({
  loader: makeGetById(id),
})(state);

const mapDispatch = {
  showRequest,
};

export default connect(mapState, mapDispatch)(EnhancedShow);
