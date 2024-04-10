import { ApiProperty } from '@nestjs/swagger';
import { createObjectSchema } from '../../../../common/validators/joi/createObjectSchema';
import { createRequestSchema } from '../../../../common/validators/joi/createRequestSchema';
import Joi = require('joi');

export class CreateReservationRequestBody {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  dateStart: Date;

  @ApiProperty()
  dateEnd: Date;
}

export const CreateReservationRequestSchema = createRequestSchema({
  body: createObjectSchema<CreateReservationRequestBody>({
    roomId: Joi.string().required(),
    dateStart: Joi.date().iso().required(),
    dateEnd: Joi.date().iso().greater(Joi.ref('dateStart')).required(),
  }),
});
