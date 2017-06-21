import React, { PropTypes } from 'react';
import Joi from 'joi-browser';

import { withRouteValidator } from 'hocs';
import Show from './Show';

export function Resolver({ params }) {
  const id = parseInt(params.id, 10);

  return (
    <Show id={id} />
  );
}

Resolver.propTypes = {
  params: PropTypes.object.isRequired,
};

const routeSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
};

export default withRouteValidator(routeSchema)(Resolver);
