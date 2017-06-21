import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  prev: {
    id: 'app.components.form.stepper_navigation.prev',
    defaultMessage: 'Previous',
  },
  next: {
    id: 'app.components.form.stepper_navigation.next',
    defaultMessage: 'Next',
  },
  finish: {
    id: 'app.components.form.stepper_navigation.finish',
    defaultMessage: 'Finish',
  },
});

class StepperNavigation extends React.PureComponent {
  onPrev = () => {
    this.props.onStepChangeRequest(this.props.step - 1);
  };

  onNext = () => {
    this.props.onStepChangeRequest(this.props.step + 1);
  };

  render() {
    const { step, stepCount, disabled, onFinish } = this.props;

    return (
      <div className="text-right">
        {step > 1 && (
          <span className="mr-1">
            <FlatButton tabIndex={-1} label={<FormattedMessage {...messages.prev} />} onTouchTap={this.onPrev} />
          </span>
        )}
        {step < stepCount ? (
          <RaisedButton
            label={<FormattedMessage {...messages.next} />}
            disabled={disabled}
            onTouchTap={this.onNext}
            secondary
          />
        ) : (
          <RaisedButton
            label={<FormattedMessage {...messages.finish} />}
            disabled={disabled}
            onTouchTap={onFinish}
            secondary
          />
        )}
      </div>
    );
  }
}

StepperNavigation.propTypes = {
  step: PropTypes.number.isRequired,
  stepCount: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onStepChangeRequest: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default StepperNavigation;
