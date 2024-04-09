import Joi = require('joi');

export const createObjectSchema = <TData extends Record<any, any>>(
  schema: Joi.StrictSchemaMap<TData>,
): Joi.ObjectSchema<Joi.StrictSchemaMap<TData>> =>
  Joi.object<TData, true, TData>().keys(schema) as unknown as Joi.ObjectSchema<
    Joi.StrictSchemaMap<TData>
  >;
