import { createObjectSchema } from 'src/common/validators/joi/createObjectSchema';
import { createRequestSchema } from 'src/common/validators/joi/createRequestSchema';
import Joi = require('joi');
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  LIST_ROOMS_ORDER_BY,
  ListRoomsOrderBy,
} from '../../../../rooms/application/constants';
import { ORDER_BY, OrderBy } from '../../../../common/application/constants';

export class ListRoomsRequestQuery {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  take?: number;

  @ApiPropertyOptional({ enum: LIST_ROOMS_ORDER_BY })
  orderBy?: ListRoomsOrderBy;

  @ApiPropertyOptional({ enum: ORDER_BY })
  orderDirection?: OrderBy;
}

export const ListRoomsRequestSchema = createRequestSchema({
  query: createObjectSchema<ListRoomsRequestQuery>({
    skip: Joi.number().min(0).optional(),
    take: Joi.number().min(1).optional(),
    orderBy: Joi.string()
      .valid(...LIST_ROOMS_ORDER_BY)
      .optional(),
    orderDirection: Joi.string()
      .valid(...ORDER_BY)
      .optional(),
  }),
});
