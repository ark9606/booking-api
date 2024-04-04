import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';
import { CreateReservationRequestBody } from './createReservation/CreateReservationRequest';
import { ReservationsService } from 'src/reservations/application/reservations.service';
import { RequestExtendedDTO } from 'src/common/dtos/RequestExtended.dto';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post('/')
  public async createReservation(
    @Req() req: RequestExtendedDTO,
    @Body() body: CreateReservationRequestBody,
  ): Promise<any> {
    // validation is skipped here intentionally
    return this.reservationService.create({
      userId: req.user.userId,
      roomId: body.roomId,
      dateStart: new Date(body.dateStart),
      dateEnd: new Date(body.dateEnd),
    });
  }
}
