import Joi = require('joi');

export interface DSRequestSchema<
  TParamsSchema extends Joi.ObjectSchema = Joi.ObjectSchema<
    Record<string, unknown>
  >,
  TQuerySchema extends Joi.ObjectSchema = Joi.ObjectSchema<
    Record<string, unknown>
  >,
  TBodySchema extends Joi.ObjectSchema = Joi.ObjectSchema<
    Record<string, unknown>
  >,
> {
  params?: TParamsSchema;
  query?: TQuerySchema;
  body?: TBodySchema;
}
