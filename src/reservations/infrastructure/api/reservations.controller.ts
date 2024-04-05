import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';
import { CreateReservationRequestBody } from './createReservation/CreateReservationRequest';
import { ReservationsService } from 'src/reservations/application/reservations.service';
import { RequestExtendedDTO } from 'src/common/dtos/RequestExtended.dto';
import { CreateReservationResponse } from './createReservation/CreateReservationResponse';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post('/')
  public async createReservation(
    @Req() req: RequestExtendedDTO,
    @Body() body: CreateReservationRequestBody,
  ): Promise<CreateReservationResponse> {
    // validation is skipped here intentionally
    return this.reservationService.create({
      user: req.user,
      roomId: body.roomId,
      dateStart: new Date(body.dateStart),
      dateEnd: new Date(body.dateEnd),
    });
  }

  @Delete('/:reservationId')
  public async cancelReservation(
    @Req() req: RequestExtendedDTO,
    @Param('reservationId') reservationId: string,
  ): Promise<void> {
    // validation is skipped here intentionally
    return this.reservationService.cancel(req.user, reservationId);
  }
}
