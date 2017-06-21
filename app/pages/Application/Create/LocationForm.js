import React from 'react';
import { reduxForm, propTypes, Field } from 'redux-form/immutable';
import { defineMessages, FormattedMessage } from 'react-intl';

import { applicationCreate } from 'store/constants/formNames';
import { isRequired } from 'utils/form/validators';
import { FieldLabel } from 'components/Form';
import { PlaceAutoComplete } from 'components/ReduxForm';
import FormWrapper from './FormWrapper';

const messages = defineMessages({
  header: {
    id: 'app.pages.application.create.location_form.header',
    defaultMessage: 'Let\'s create your application',
  },
  location: {
    id: 'app.pages.application.create.location_form.location',
    defaultMessage: 'Where are you?',
  },
});

export function LocationForm({ error, handleSubmit }) {
  return (
    <FormWrapper title={<FormattedMessage {...messages.header} />} error={error} onSubmit={handleSubmit}>
      <div>
        <Field
          name="location"
          component={PlaceAutoComplete}
          floatingLabelText={<FieldLabel required><FormattedMessage {...messages.location} /></FieldLabel>}
          fullWidth
          validate={isRequired}
        />
      </div>
    </FormWrapper>
  );
}

LocationForm.propTypes = {
  ...propTypes,
};

export default reduxForm({
  form: applicationCreate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(LocationForm);
