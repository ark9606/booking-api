import { ReservationEntity } from '../infrastructure/persistence/reservation.entity';

export interface IReservationRepository {
  createReservation(input: {
    userId: string;
    roomId: string;
    dateStart: Date;
    dateEnd: Date;
}): Promise<ReservationEntity>;
}
