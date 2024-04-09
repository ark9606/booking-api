import Joi = require('joi');
import { DSRequestSchema } from './DSRequestSchema';

export const createRequestSchema = <TSchema extends DSRequestSchema>(
  schema: TSchema,
): Joi.ObjectSchema<TSchema> => {
  const { params, query, body } = schema;

  const joiSchema: Joi.PartialSchemaMap<TSchema> = {};
  if (body) {
    joiSchema.body = body.options({ allowUnknown: false });
  }

  if (params) {
    joiSchema.params = params.options({ allowUnknown: false });
  }

  if (query) {
    joiSchema.query = query.options({ allowUnknown: false });
  }

  return Joi.object<TSchema, true, TSchema>().keys(joiSchema);
};
