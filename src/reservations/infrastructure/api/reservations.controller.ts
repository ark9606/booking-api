import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';
import {
  CreateReservationRequestBody,
  CreateReservationRequestSchema,
} from './createReservation/CreateReservationRequest';
import { ReservationsService } from '../../../reservations/application/reservations.service';
import { RequestExtendedDTO } from '../../../common/dtos/RequestExtended.dto';
import { CreateReservationResponse } from './createReservation/CreateReservationResponse';
import { validate } from '../../../common/validators/joi/ValidationInterceptor';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post('/')
  @UseInterceptors(validate(CreateReservationRequestSchema))
  public async createReservation(
    @Req() req: RequestExtendedDTO,
    @Body() body: CreateReservationRequestBody,
  ): Promise<CreateReservationResponse> {
    return this.reservationService.create({
      user: req.user,
      roomId: body.roomId,
      dateStart: body.dateStart,
      dateEnd: body.dateEnd,
    });
  }

  @Delete('/:reservationId')
  public async cancelReservation(
    @Req() req: RequestExtendedDTO,
    @Param('reservationId') reservationId: string,
  ): Promise<void> {
    return this.reservationService.cancel(req.user, reservationId);
  }
}
