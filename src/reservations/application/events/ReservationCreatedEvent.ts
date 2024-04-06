import { ReservationDTO } from '../reservation.dto';

export class ReservationCreatedEvent {
  constructor(public readonly data: ReservationDTO) {}

  static Type = 'reservation.created';
}
