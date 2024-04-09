import { createObjectSchema } from 'src/common/validators/joi/createObjectSchema';
import { createRequestSchema } from 'src/common/validators/joi/createRequestSchema';
import Joi = require('joi');

export class ListRoomsRequestQuery {
  skip?: number;
  take?: number;
  orderBy?: 'price' | 'area';
  orderDirection: 'ASC' | 'DESC';
}

export const ListRoomsRequestSchema = createRequestSchema({
  query: createObjectSchema<ListRoomsRequestQuery>({
    skip: Joi.number().min(0).optional(),
    take: Joi.number().min(1).optional(),
    orderBy: Joi.string().valid('price', 'area').optional(),
    orderDirection: Joi.string().valid('ASC', 'DESC').required(),
  }),
});
