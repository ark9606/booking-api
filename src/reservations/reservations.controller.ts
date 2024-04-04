import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  @Post('')
  public async createReservation(): Promise<any> {
    return 'ok';
  }
}
