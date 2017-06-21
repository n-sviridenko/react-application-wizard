import React from 'react';
import { reduxForm, propTypes, Field } from 'redux-form/immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { applicationCreate } from 'store/constants/formNames';
import { isRequired } from 'utils/form/validators';
import { FieldLabel } from 'components/Form';
import { TextField } from 'components/ReduxForm';
import FormWrapper from './FormWrapper';

const messages = defineMessages({
  header: {
    id: 'app.pages.application.create.details_form.header',
    defaultMessage: 'Details',
  },
  firstName: {
    id: 'app.pages.application.create.details_form.first_name',
    defaultMessage: 'First name',
  },
  lastName: {
    id: 'app.pages.application.create.details_form.last_name',
    defaultMessage: 'Last name',
  },
  email: {
    id: 'app.pages.application.create.details_form.email',
    defaultMessage: 'Email address',
  },
  phone: {
    id: 'app.pages.application.create.details_form.phone',
    defaultMessage: 'Phone number',
  },
});

export function LocationForm({ error, handleSubmit }) {
  return (
    <FormWrapper title={<FormattedMessage {...messages.header} />} error={error} onSubmit={handleSubmit}>
      <div>
        <Field
          name="firstName"
          component={TextField}
          floatingLabelText={<FieldLabel required><FormattedMessage {...messages.firstName} /></FieldLabel>}
          fullWidth
          validate={isRequired}
        />
      </div>
      <div>
        <Field
          name="lastName"
          component={TextField}
          floatingLabelText={<FieldLabel required><FormattedMessage {...messages.lastName} /></FieldLabel>}
          fullWidth
          validate={isRequired}
        />
      </div>
      <div>
        <Field
          name="email"
          type="email"
          component={TextField}
          floatingLabelText={<FieldLabel required><FormattedMessage {...messages.email} /></FieldLabel>}
          fullWidth
          validate={isRequired}
        />
      </div>
      <div>
        <Field
          name="phone"
          component={TextField}
          floatingLabelText={<FieldLabel><FormattedMessage {...messages.phone} /></FieldLabel>}
          fullWidth
        />
      </div>
    </FormWrapper>
  );
}

LocationForm.propTypes = {
  ...propTypes,
  onAfterSubmitSuccess: PropTypes.func.isRequired,
};

export default reduxForm({
  form: applicationCreate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmitSuccess: (result, dispatch, props) => {
    props.reset();
    props.onAfterSubmitSuccess(result);
  },
})(LocationForm);
