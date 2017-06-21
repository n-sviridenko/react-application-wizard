import React from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { locationShape, routerShape } from 'react-router';

function withRouteValidator(routeSchema) {
  return function wrapWithRouteValidator(WrappedComponent) {
    class RouteValidator extends React.Component {
      componentWillMount() {
        const { router, params, location: { query } } = this.props;
        const finalRouteSchema = { params: Joi.any(), query: Joi.any(), ...routeSchema };
        const result = Joi.validate({ params, query }, finalRouteSchema);

        this.valid = result.error === null;

        if (!this.valid) {
          if (process.env.NODE_ENV === 'development') {
            console.error(result.error); // eslint-disable-line no-console
          }

          router.replace('/');
        }
      }

      render() {
        return this.valid ? <WrappedComponent {...this.props} /> : null;
      }
    }

    RouteValidator.propTypes = {
      params: PropTypes.object.isRequired,
      location: locationShape,
      router: routerShape,
    };

    return RouteValidator;
  };
}

export default withRouteValidator;
