import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ReservationCreatedEvent } from '../../reservations/application/events/ReservationCreatedEvent';
import { DI_TOKENS } from '../../common/di-tokens';
import { INotificationSender } from '../senders/sender.interface';

@Injectable()
export class SendNotificationListener {
  constructor(
    @Inject(DI_TOKENS.FAKE_SENDER)
    private readonly sender: INotificationSender,
  ) {}

  @OnEvent(ReservationCreatedEvent.Type)
  public async onReservationCreated(
    payload: ReservationCreatedEvent,
  ): Promise<void> {
    const { room, user } = payload.data;
    const message = `User ${user.firstName} ${user.lastName} successfully booked room ${room.title} from ${payload.data.dateStart.toISOString()} to ${payload.data.dateEnd.toISOString()}`;
    await this.sender.send(message, user.email);
  }
}
