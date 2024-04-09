import { createObjectSchema } from '../../../../common/validators/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/validators/joi/createRequestSchema';
import Joi = require('joi');

export class GetRoomAvailabilityRequestQuery {
  from: Date;
  to: Date;
}

export const GetRoomAvailabilityRequestSchema = createRequestSchema({
  query: createObjectSchema<GetRoomAvailabilityRequestQuery>({
    from: Joi.date().iso().required(),
    to: Joi.date().iso().greater(Joi.ref('from')).required(),
  }),
});
