import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isSubmitting, submit } from 'redux-form/immutable';
import { routerShape } from 'react-router';

import { applicationCreate } from 'store/constants/formNames';
import { buildSubmit } from 'store/actions/forms';
import { createRequest, CREATE_SUCCESS, CREATE_FAIL } from 'store/actions/application';
import { Container } from 'components/Common';
import { StepperNavigation } from 'components/Form';
import LocationForm from './LocationForm';
import DetailsForm from './DetailsForm';

const stepCount = 2;

const handleSubmit = buildSubmit(createRequest, CREATE_SUCCESS, CREATE_FAIL);

export class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
    };
  }

  onStepChangeRequest = (step) => {
    this.setState({ step });
  };

  onNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  onFinish = () => {
    this.props.submit();
  };

  onAfterSubmitSuccess = (id) => {
    this.props.router.push(`/applications/${id}`);
  };

  renderStep() {
    switch (this.state.step) {
      case 1:
        return <LocationForm onSubmit={this.onNextStep} />;
      case 2:
        return <DetailsForm onSubmit={handleSubmit} onAfterSubmitSuccess={this.onAfterSubmitSuccess} />;
      default:
        return null;
    }
  }

  render() {
    const { submitting } = this.props;

    return (
      <Container>
        {this.renderStep()}
        <StepperNavigation
          disabled={submitting}
          step={this.state.step}
          stepCount={stepCount}
          onStepChangeRequest={this.onStepChangeRequest}
          onFinish={this.onFinish}
        />
      </Container>
    );
  }
}

Create.propTypes = {
  submitting: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  router: routerShape.isRequired,
};

const mapState = createStructuredSelector({
  submitting: isSubmitting(applicationCreate),
});

const mapDispatch = {
  submit: () => submit(applicationCreate),
};

export default connect(mapState, mapDispatch)(Create);
